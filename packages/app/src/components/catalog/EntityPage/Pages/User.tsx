import {EntityLayout} from "@backstage/plugin-catalog";
import {Grid} from "@material-ui/core";
import {EntityOwnershipCard, EntityUserProfileCard} from "@backstage/plugin-org";
import React from "react";
import {entityWarningContent} from "../Content/EntityWarning";

export const userPage = (
    <EntityLayout>
        <EntityLayout.Route path="/" title="Overview">
            <Grid container spacing={3}>
                {entityWarningContent}
                <Grid item xs={12} md={6}>
                    <EntityUserProfileCard variant="gridItem" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <EntityOwnershipCard variant="gridItem" />
                </Grid>
            </Grid>
        </EntityLayout.Route>
    </EntityLayout>
);