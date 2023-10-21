import {EntityLayout} from "@backstage/plugin-catalog";
import {Grid} from "@material-ui/core";
import {EntityConsumedApisCard, EntityProvidedApisCard} from "@backstage/plugin-api-docs";
import React from "react";
import {
    ciContent, dependenciesContent,
    deploymentsContent,
    overviewContent,
    prContent,
    techdocsContent
} from "../Content";
import {EntityGithubInsightsContent} from "@roadiehq/backstage-plugin-github-insights";


export const serviceEntityPage = (
    <EntityLayout>
        <EntityLayout.Route path="/" title="Overview">
            {overviewContent}
        </EntityLayout.Route>
        <EntityLayout.Route path="/ci" title="CI">
            {ciContent}
        </EntityLayout.Route>
        <EntityLayout.Route path="/pullrequests" title="PR's">
            {prContent}
        </EntityLayout.Route>
        <EntityLayout.Route path="/api" title="API">
            <Grid container spacing={3} alignItems="stretch">
                <Grid item md={6}>
                    <EntityProvidedApisCard />
                </Grid>
                <Grid item md={6}>
                    <EntityConsumedApisCard />
                </Grid>
            </Grid>
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