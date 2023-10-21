import React from 'react';
import {Grid} from "@material-ui/core";
import {EntityGithubDeploymentsCard} from "@backstage/plugin-github-deployments";

export const deploymentsContent = (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <EntityGithubDeploymentsCard />
        </Grid>
    </Grid>
);