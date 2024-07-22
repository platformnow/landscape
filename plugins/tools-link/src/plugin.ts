import {
  createApiFactory,
  createComponentExtension,
  createPlugin, createRoutableExtension,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { toolLinksApiRef, ToolLinksClient } from './api';

export const toolLinksPlugin = createPlugin({
  id: 'tools-link',
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

export const DevtoolShortcutsPage = toolLinksPlugin.provide(
    createRoutableExtension({
      name: 'DevtoolShortcutsPage',
      component: () =>
          import('./components/HomeScreenShortcutsPage').then(m => m.HomeScreenShortcutsPage),
      mountPoint: rootRouteRef,
    }),
);