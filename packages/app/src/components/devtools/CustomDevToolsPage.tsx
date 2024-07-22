import {
    ConfigContent,
    ExternalDependenciesContent,
    InfoContent,
} from '@backstage/plugin-devtools';
import { DevToolsLayout } from '@backstage/plugin-devtools';
import { UnprocessedEntitiesContent } from '@backstage/plugin-catalog-unprocessed-entities';
import { EntityValidationPage } from '@backstage-community/plugin-entity-validation';
import React from 'react';
import { DevtoolShortcutsPage } from '@internal/backstage-plugin-tools-link';

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
            <DevToolsLayout.Route path="entity-validation" title="Entity Validation">
                <EntityValidationPage />
            </DevToolsLayout.Route>
            <DevToolsLayout.Route path="devtool-shortcuts" title="Homepage Shortcuts">
                <DevtoolShortcutsPage />
            </DevToolsLayout.Route>
        </DevToolsLayout>
    );
};

export const customDevToolsPage = <DevToolsPage />;