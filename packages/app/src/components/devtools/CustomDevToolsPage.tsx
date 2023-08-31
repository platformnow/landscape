import {
    ConfigContent,
    ExternalDependenciesContent,
    InfoContent,
} from '@backstage/plugin-devtools';
import { DevToolsLayout } from '@backstage/plugin-devtools';
import React from 'react';
import { UnprocessedEntitiesContent } from '@backstage/plugin-catalog-unprocessed-entities';

export const DevToolsPage = () => {
    return (
        <DevToolsLayout>
            <DevToolsLayout.Route path="info" title="Info">
                <InfoContent />
            </DevToolsLayout.Route>
            <DevToolsLayout.Route path="config" title="Config">
                <ConfigContent />
            </DevToolsLayout.Route>
            <DevToolsLayout.Route
                path="external-dependencies"
                title="External Dependencies"
            >
                <ExternalDependenciesContent />
            </DevToolsLayout.Route>
            <DevToolsLayout.Route path="unprocessed-entities" title="Unprocessed Entities">
              <UnprocessedEntitiesContent />
            </DevToolsLayout.Route>
        </DevToolsLayout>
    );
};

export const customDevToolsPage = <DevToolsPage />;