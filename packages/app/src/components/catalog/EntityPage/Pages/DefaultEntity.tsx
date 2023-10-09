import { EntityLayout } from '@backstage/plugin-catalog';
import React from 'react';
import {dependenciesContent, overviewContent, techdocsContent} from '../Content';

export const defaultEntityPage = (
    <EntityLayout>
        <EntityLayout.Route path="/" title="Overview">
            {overviewContent}
        </EntityLayout.Route>
        <EntityLayout.Route path="/docs" title="Docs">
            {techdocsContent}
        </EntityLayout.Route>
        <EntityLayout.Route path="/dependencies" title="Dependencies">
            {dependenciesContent}
        </EntityLayout.Route>
    </EntityLayout>
);
