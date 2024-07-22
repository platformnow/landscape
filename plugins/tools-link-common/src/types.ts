import { JsonValue } from '@backstage/types';

/** @public */
export type Endpoint = {
    name: string;
    type: string;
    target: string;
};

/** @public */
export type ExternalDependency = {
    name: string;
    type: string;
    target: string;
    status: string;
    error?: string;
};

/** @public */
export type DevToolsInfo = {
    operatingSystem: string;
    resourceUtilization: string;
    nodeJsVersion: string;
    backstageVersion: string;
    dependencies: PackageDependency[];
};

/** @public */
export type PackageDependency = {
    name: string;
    versions: string;
};

/** @public */
export enum ExternalDependencyStatus {
    healthy = 'Healthy',
    unhealthy = 'Unhealthy',
}

/** @public */
export type ConfigInfo = {
    config?: JsonValue;
    error?: ConfigError;
};

/** @public */
export type ConfigError = {
    name: string;
    message: string;
    messages?: string[];
    stack?: string;
};