import { errorHandler, PluginDatabaseManager } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { DatabaseHandler } from './DatabaseHandler';

export interface RouterOptions {
  logger: Logger;
  database: PluginDatabaseManager;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { database, logger } = options;

  logger.info('Initializing Homepage Links backend');

  const db = await database.getClient();
  const dbHandler = await DatabaseHandler.create({ client: db });

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    response.status(200).json({ status: 'healthy' });
  });

  // Fetch all categories with their associated links
  router.get('/toolLinks', async (_, res) => {
    const categories = await dbHandler.listCategoriesWithLinks();
    res.status(200).json(categories);
  });

  // Fetch all categories
  router.get('/categories', async (_, res) => {
    const categories = await dbHandler.listAllCategories();
    res.status(200).json(categories);
  });

  // Add a new category without links
  router.post('/categories', async (req, res) => {
    const { title, isExpanded } = req.body;
    const id = await dbHandler.createCategory(title, isExpanded);
    res.status(201).json({ id });
  });

  // Fetch a specific category by ID
  router.get('/categories/:categoryId', async (req, res) => {
    const category = await dbHandler.getCategory(String(req.params.categoryId));
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.status(200).json({ category });
    }
  });

  // Update a category by ID
  router.put('/categories/:categoryId', async (req, res) => {
    const { title, isExpanded } = req.body;
    await dbHandler.updateCategory(
      String(req.params.categoryId),
      title,
      isExpanded,
    );
    res.status(200).send('Updated successfully');
  });

  // Delete a category by ID
  router.delete('/categories/:categoryId', async (req, res) => {
    await dbHandler.deleteCategory(Number(req.params.categoryId));
    res.status(200).send('Deleted successfully');
  });

  // Fetch all links
  router.get('/links', async (_, res) => {
    const links = await dbHandler.listAllLinks();
    res.status(200).json({ links });
  });

  // Add a link to a specific category
  router.post('/categories/:categoryId/links', async (req, res) => {
    const { iconUrl, label, url } = req.body;
    const id = await dbHandler.createLink(
      String(req.params.categoryId),
      iconUrl,
      label,
      url,
    );
    res.status(201).json({ id });
  });

  // Add a link to a specific category
  router.post('/links', async (req, res) => {
    const { categoryId, iconUrl, label, url } = req.body;
    const id = await dbHandler.createLink(categoryId, iconUrl, label, url);
    res.status(201).json({ id });
  });

  router.post('/categories', async (req, res) => {
    const { title, isExpanded } = req.body;
    const id = await dbHandler.createCategory(title, isExpanded);
    res.status(201).json({ id });
  });

  // Fetch a specific link by ID
  router.get('/links/:linkId', async (req, res) => {
    const link = await dbHandler.getLink(String(req.params.linkId));
    if (!link) {
      res.status(404).json({ error: 'Link not found' });
    } else {
      res.status(200).json({ link });
    }
  });

  // Update a link by ID
  router.put('/links/:linkId', async (req, res) => {
    const { iconUrl, label, url } = req.body;
    await dbHandler.updateLink(Number(req.params.linkId), iconUrl, label, url);
    res.status(200).send('Updated successfully');
  });

  router.delete('/links/:linkId', async (req, res) => {
    await dbHandler.deleteLink(Number(req.params.linkId));
    res.status(200).send('Deleted successfully');
  });

  router.use(errorHandler());
  return router;
}
