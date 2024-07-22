import { MiddlewareFactory }from '@backstage/backend-defaults/rootHttpRouter'

import {
  DatabaseService,
  LoggerService,
  PermissionsService,
  DiscoveryService,
  HttpAuthService,
} from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';
import { AuthorizeResult } from '@backstage/plugin-permission-common';
import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { NotAllowedError } from '@backstage/errors';
import { DatabaseHandler } from './DatabaseHandler';
import {
  toolsLinkReadPermission,
  toolsLinkDeletePermission,
  toolsLinkCreatePermission,
  toolsLinkPermissions,
} from '@internal/backstage-plugin-tools-link-common';
import { Config } from '@backstage/config';

export interface RouterOptions {
  logger: LoggerService;
  database: DatabaseService;
  permissions: PermissionsService;
  discovery: DiscoveryService;
  httpAuth: HttpAuthService;
  config: Config;
}

export async function createRouter(
    options: RouterOptions,
): Promise<express.Router> {
  const { logger, database, permissions, httpAuth, config } = options;

  logger.info('Initializing Homepage Links backend');

  const db = await database.getClient();
  const dbHandler = await DatabaseHandler.create({ client: db });

  const router = Router();
  router.use(express.json());
  router.use(
      createPermissionIntegrationRouter({
        permissions: toolsLinkPermissions,
      }),
  );

  const checkPermission = async (req: express.Request, permission: any) => {
    const credentials = await httpAuth.credentials(req);
    const decision = (
        await permissions.authorize([{ permission }], { credentials })
    )[0];

    if (decision.result === AuthorizeResult.DENY) {
      throw new NotAllowedError('Unauthorized');
    }
  };

  router.get('/health', (_, response) => {
    response.status(200).json({ status: 'healthy' });
  });

  router.get('/toolLinks', async (req, res) => {
    await checkPermission(req, toolsLinkReadPermission);

    const categories = await dbHandler.listCategoriesWithLinks();
    res.status(200).json(categories);
  });

  router.get('/categories', async (req, res) => {
    await checkPermission(req, toolsLinkReadPermission);

    const categories = await dbHandler.listAllCategories();
    res.status(200).json(categories);
  });

  router.post('/categories', async (req, res) => {
    await checkPermission(req, toolsLinkCreatePermission);

    const { title, isExpanded } = req.body;
    const id = await dbHandler.createCategory(title, isExpanded);
    res.status(201).json({ id });
  });

  router.get('/categories/:categoryId', async (req, res) => {
    await checkPermission(req, toolsLinkReadPermission);

    const category = await dbHandler.getCategory(String(req.params.categoryId));
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.status(200).json({ category });
    }
  });

  router.put('/categories/:categoryId', async (req, res) => {
    await checkPermission(req, toolsLinkCreatePermission);

    const { title, isExpanded } = req.body;
    await dbHandler.updateCategory(
        String(req.params.categoryId),
        title,
        isExpanded,
    );
    res.status(200).send('Updated successfully');
  });

  router.delete('/categories/:categoryId', async (req, res) => {
    await checkPermission(req, toolsLinkDeletePermission);

    await dbHandler.deleteCategory(Number(req.params.categoryId));
    res.status(200).send('Deleted successfully');
  });

  router.get('/links', async (req, res) => {
    await checkPermission(req, toolsLinkReadPermission);

    const links = await dbHandler.listAllLinks();
    res.status(200).json({ links });
  });

  router.post('/categories/:categoryId/links', async (req, res) => {
    await checkPermission(req, toolsLinkCreatePermission);

    const { iconUrl, label, url } = req.body;
    const id = await dbHandler.createLink(
        String(req.params.categoryId),
        iconUrl,
        label,
        url,
    );
    res.status(201).json({ id });
  });

  router.post('/links', async (req, res) => {
    await checkPermission(req, toolsLinkCreatePermission);

    const { categoryId, iconUrl, label, url } = req.body;
    const id = await dbHandler.createLink(categoryId, iconUrl, label, url);
    res.status(201).json({ id });
  });

  router.get('/links/:linkId', async (req, res) => {
    await checkPermission(req, toolsLinkReadPermission);

    const link = await dbHandler.getLink(String(req.params.linkId));
    if (!link) {
      res.status(404).json({ error: 'Link not found' });
    } else {
      res.status(200).json({ link });
    }
  });

  router.put('/links/:linkId', async (req, res) => {
    await checkPermission(req, toolsLinkCreatePermission);

    const { iconUrl, label, url } = req.body;
    await dbHandler.updateLink(Number(req.params.linkId), iconUrl, label, url);
    res.status(200).send('Updated successfully');
  });

  router.delete('/links/:linkId', async (req, res) => {
    await checkPermission(req, toolsLinkDeletePermission);

    await dbHandler.deleteLink(Number(req.params.linkId));
    res.status(200).send('Deleted successfully');
  });

  router.use(MiddlewareFactory.create({ logger, config }).error);
  return router;
}