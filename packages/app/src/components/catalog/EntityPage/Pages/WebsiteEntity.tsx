import { EntityLayout } from "@backstage/plugin-catalog";
import React from "react";
import {
    cdContent,
    ciContent,
    dependenciesContent,
    deploymentsContent,
    overviewContent,
    prContent,
    techdocsContent
} from "../Content";
import {EntityGithubInsightsContent} from "@roadiehq/backstage-plugin-github-insights";

export const websiteEntityPage = (
    <EntityLayout>
        <EntityLayout.Route path="/" title="Overview">
            {overviewContent}
        </EntityLayout.Route>
        <EntityLayout.Route path="/ci" title="CI">
            {ciContent}
        </EntityLayout.Route>
        <EntityLayout.Route path="/cd" title="CD">
            {cdContent}
        </EntityLayout.Route>
        <EntityLayout.Route path="/pullrequests" title="PR's">
            {prContent}
        </EntityLayout.Route>
        <EntityLayout.Route path="/docs" title="Docs">
            {techdocsContent}
        </EntityLayout.Route>
        <EntityLayout.Route path="/deployments" title="Deployments">
            {deploymentsContent}
        </EntityLayout.Route>
        <EntityLayout.Route path="/dependencies" title="Dependencies">
            {dependenciesContent}
        </EntityLayout.Route>
        <EntityLayout.Route
            path="/code-insights"
            title="Code Insights">
            <EntityGithubInsightsContent />
        </EntityLayout.Route>
    </EntityLayout>
);