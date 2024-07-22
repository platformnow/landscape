import { Logger } from 'winston';
import { Config } from '@backstage/config';
import { ServerPermissionClient } from '@backstage/plugin-permission-node';
import {PluginEndpointDiscovery} from "@backstage/backend-common";
import {IdentityApi} from "@backstage/plugin-auth-node";


export type PluginEnvironment = {
    logger: Logger;
    config: Config;
    permissions: ServerPermissionClient;
    discovery: PluginEndpointDiscovery;
    identity: IdentityApi;
};