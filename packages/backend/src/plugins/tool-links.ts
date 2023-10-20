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