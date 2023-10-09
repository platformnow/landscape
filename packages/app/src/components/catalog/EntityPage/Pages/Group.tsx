import {EntityLayout, EntitySwitch} from "@backstage/plugin-catalog";
import {Grid} from "@material-ui/core";
import {EntityGroupProfileCard, EntityMembersListCard, EntityOwnershipCard} from "@backstage/plugin-org";
import React from "react";
import {entityWarningContent} from "../Content/EntityWarning";
import {
    EntityGithubGroupPullRequestsCard,
    isGithubTeamPullRequestsAvailable
} from "@roadiehq/backstage-plugin-github-pull-requests";

export const groupPage = (
    <EntityLayout>
        <EntityLayout.Route path="/" title="Overview">
            <Grid container spacing={3}>
                {entityWarningContent}
                <Grid item xs={12} md={6}>
                    <EntityGroupProfileCard variant="gridItem" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <EntityOwnershipCard variant="gridItem" />
                </Grid>
                <Grid item xs={12}>
                    <EntityMembersListCard />
                </Grid>
                <EntitySwitch>
                    <EntitySwitch.Case if={isGithubTeamPullRequestsAvailable}>
                        <Grid item xs={12}>
                            <EntityGithubGroupPullRequestsCard/>
                        </Grid>
                    </EntitySwitch.Case>
                </EntitySwitch>
            </Grid>
        </EntityLayout.Route>
    </EntityLayout>
);