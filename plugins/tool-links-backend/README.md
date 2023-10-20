# tool-links

Welcome to the tool-links backend plugin!

## Installation

### Install the package

```bash
# From your Backstage root directory
yarn add --cwd packages/backend @platformnow/plugin-tool-links-backend
```

### Adding the plugin to your `packages/backend`

You'll need to add the plugin to the router in your `backend` package. You can do this by creating a file called `packages/backend/src/plugins/tool-links.ts`

```tsx
import { createRouter } from '@platformnow/plugin-tool-links-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
    env: PluginEnvironment,
): Promise<Router> {
    return await createRouter({
        database: env.database,
        logger: env.logger,
    });
}
```

With the `tool-links.ts` router setup in place, add the router to `packages/backend/src/index.ts`:

```diff
+import toolLinks from './plugins/tool-links';

async function main() {
  ...
  const createEnv = makeCreateEnv(config);

  const catalogEnv = useHotMemoize(module, () => createEnv('catalog'));
+ const toolLinksEnv = useHotMemoize(module, () => createEnv('tool-links'));

  const apiRouter = Router();
+ apiRouter.use('/tool-links', await toolLinks(toolLinksEnv));
  ...
  apiRouter.use(notFoundHandler());

```

### New Backend System

The Tool-Links backend plugin has support for the [new backend system](https://backstage.io/docs/backend-system/), here's how you can set that up:

In your `packages/backend/src/index.ts` make the following changes:

```diff
import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

backend.add(import('@backstage/plugin-tool-links-backend'));
// ... other feature additions

backend.start();
```