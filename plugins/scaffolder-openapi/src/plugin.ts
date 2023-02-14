import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const scaffolderOpenapiPlugin = createPlugin({
  id: 'scaffolder-openapi',
  routes: {
    root: rootRouteRef,
  },
});

export const ScaffolderOpenapiPage = scaffolderOpenapiPlugin.provide(
  createRoutableExtension({
    name: 'ScaffolderOpenapiPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
