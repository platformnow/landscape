import {Grid} from "@material-ui/core";
import {EntityAboutCard, EntityHasSubcomponentsCard, EntityLinksCard, EntitySwitch} from "@backstage/plugin-catalog";
import {EntitySonarQubeCard} from "@backstage/plugin-sonarqube";
import {EntityArgoCDOverviewCard, isArgocdAvailable} from "@roadiehq/backstage-plugin-argo-cd";
import React from "react";
import {entityWarningContent} from "./EntityWarning";
import {
    EntityGithubPullRequestsOverviewCard,
    isGithubPullRequestsAvailable
} from "@roadiehq/backstage-plugin-github-pull-requests";
import {
    EntityGithubInsightsEnvironmentsCard,
    EntityGithubInsightsLanguagesCard,
    EntityGithubInsightsReleasesCard,
    isGithubInsightsAvailable
} from "@roadiehq/backstage-plugin-github-insights";

export const overviewContent = (
    <Grid container spacing={3} alignItems="stretch">
        {entityWarningContent}
        <Grid item md={6}>
            <EntityAboutCard variant="gridItem" />
        </Grid>
        <Grid item md={6}>
            <EntitySonarQubeCard variant="gridItem" />
        </Grid>
        <EntitySwitch>
            <EntitySwitch.Case if={isGithubInsightsAvailable}>
                <Grid item md={6}>
                    <EntityGithubInsightsLanguagesCard />
                    <EntityGithubInsightsReleasesCard />
                    <EntityGithubInsightsEnvironmentsCard />
                </Grid>
            </EntitySwitch.Case>
        </EntitySwitch>
        <Grid item md={6}>
            <EntityLinksCard />
        </Grid>
        <EntitySwitch>
            <EntitySwitch.Case if={e => Boolean(isArgocdAvailable(e))}>
                <Grid item md={6}>
                    <EntityArgoCDOverviewCard />
                </Grid>
            </EntitySwitch.Case>
        </EntitySwitch>
        <EntitySwitch>
            <EntitySwitch.Case if={isGithubPullRequestsAvailable}>
                <Grid item md={6}>
                    <EntityGithubPullRequestsOverviewCard />
                </Grid>
            </EntitySwitch.Case>
        </EntitySwitch>

        <Grid item md={8} xs={12}>
            <EntityHasSubcomponentsCard variant="gridItem" />
        </Grid>

    </Grid>
);