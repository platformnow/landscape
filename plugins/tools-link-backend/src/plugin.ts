import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service';
import { loggerToWinstonLogger } from '@backstage/backend-common';

export const toolLinksPlugin = createBackendPlugin({
  pluginId: 'tools-link',
  register(env) {
    env.registerInit({
      deps: {
        http: coreServices.httpRouter,
        logger: coreServices.logger,
        database: coreServices.database,
        discovery: coreServices.discovery,
        httpAuth: coreServices.httpAuth,
        permissions: coreServices.permissions,
        config: coreServices.rootConfig,
      },
      async init({ http, logger, database, discovery, httpAuth, permissions, config }) {
        http.use(
            await createRouter({
              logger: loggerToWinstonLogger(logger),
              database,
              discovery,
              httpAuth,
              permissions,
              config,
            }),
        );

        // Adding auth policy to allow unauthenticated requests to the health endpoint
        http.addAuthPolicy({
          path: '/health',
          allow: 'unauthenticated',
        });
      },
    });
  },
});