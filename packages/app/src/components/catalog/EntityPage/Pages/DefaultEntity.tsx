import { EntityLayout } from '@backstage/plugin-catalog';
import React from 'react';
import {adrContent, dependenciesContent, overviewContent, techdocsContent} from '../Content';
import {isAdrAvailable} from "@backstage/plugin-adr";

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
          <EntityLayout.Route if={isAdrAvailable} path="/adrs" title="ADRs">
            {adrContent}
        </EntityLayout.Route>
    </EntityLayout>
);
