import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service';
import { loggerToWinstonLogger } from '@backstage/backend-common';

export const toolLinksPLugin = createBackendPlugin({
  pluginId: 'tool-links',
  register(env) {
    env.registerInit({
      deps: {
        http: coreServices.httpRouter,
        logger: coreServices.logger,
        database: coreServices.database,
      },
      async init({ http, logger, database }) {
        http.use(
          await createRouter({
            logger: loggerToWinstonLogger(logger),
            database,
          }),
        );
      },
    });
  },
});
