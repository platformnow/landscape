import { type Entity } from '@backstage/catalog-model';
import { EntitySwitch } from '@backstage/plugin-catalog';
import {
    EntityGithubPullRequestsContent,
    isGithubPullRequestsAvailable,
} from '@roadiehq/backstage-plugin-github-pull-requests';
import React from 'react';
import {Grid} from "@material-ui/core";

const ifPRs: ((e: Entity) => boolean)[] = [
    isGithubPullRequestsAvailable,
];

export const isPRsAvailable = (e: Entity) => ifPRs.some(f => f(e));

export const prContent = (
    <Grid container spacing={3}>
        <EntitySwitch>
            <EntitySwitch.Case if={isGithubPullRequestsAvailable}>
                <Grid item xs={12}>
                    <EntityGithubPullRequestsContent />
                </Grid>
            </EntitySwitch.Case>
        </EntitySwitch>
    </Grid>
);