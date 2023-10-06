import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-catalog-backend-module-scaffolder-entity-model';
import { UnprocessedEntitiesModule } from '@backstage/plugin-catalog-backend-module-unprocessed';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { GithubMultiOrgEntityProvider } from '@backstage/plugin-catalog-backend-module-github';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.addProcessor(new ScaffolderEntitiesProcessor());
  // The GitHub URL below needs to match a configured integrations.github entry
  // specified in your app-config.
  builder.addEntityProvider(
      GithubMultiOrgEntityProvider.fromConfig(env.config, {
        id: 'production',
        githubUrl: 'https://github.com',
        // Set the following to list the GitHub orgs you wish to ingest from. You can
        // also omit this option to ingest all orgs accessible by your GitHub integration
        logger: env.logger,
        schedule: env.scheduler.createScheduledTaskRunner({
          frequency: { minutes: 60 },
          timeout: { minutes: 15 },
        }),
      }),
  );

  const { processingEngine, router } = await builder.build();

  const unprocessed = new UnprocessedEntitiesModule(
      await env.database.getClient(),
      router,
  );
  unprocessed.registerRoutes();
  await processingEngine.start();
  return router;
}
