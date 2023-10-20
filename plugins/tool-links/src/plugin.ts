import {
  createApiFactory,
  createComponentExtension,
  createPlugin,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { toolLinksApiRef, ToolLinksClient } from './api';

export const toolLinksPlugin = createPlugin({
  id: 'tool-links',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: toolLinksApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
      },
      factory: ({ discoveryApi, fetchApi }) =>
        new ToolLinksClient({ discoveryApi, fetchApi }),
    }),
  ],
});

export const ToolLinksComponent = toolLinksPlugin.provide(
  createComponentExtension({
    name: 'ToolLinksComponent',
    component: {
      lazy: () =>
        import('./components/ToolLinksComponent').then(
          m => m.ToolLinksComponent,
        ),
    },
  }),
);
