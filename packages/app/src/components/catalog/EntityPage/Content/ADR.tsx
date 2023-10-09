import React from 'react';
import {Grid} from "@material-ui/core";
import {EntityAdrContent} from "@backstage/plugin-adr";

export const adrContent = (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <EntityAdrContent />
        </Grid>
    </Grid>
);