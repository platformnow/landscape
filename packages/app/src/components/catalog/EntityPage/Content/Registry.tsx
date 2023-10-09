import React from 'react';
import {Grid} from "@material-ui/core";
import {NexusRepositoryManagerPage} from "@janus-idp/backstage-plugin-nexus-repository-manager";

export const registryContent = (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <NexusRepositoryManagerPage />
        </Grid>
    </Grid>
);