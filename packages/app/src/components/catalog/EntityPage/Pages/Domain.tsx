import {EntityAboutCard, EntityHasSystemsCard, EntityLayout} from "@backstage/plugin-catalog";
import {Grid} from "@material-ui/core";
import {EntityCatalogGraphCard} from "@backstage/plugin-catalog-graph";
import React from "react";
import {entityWarningContent} from "../Content/EntityWarning";

export const domainPage = (
    <EntityLayout>
        <EntityLayout.Route path="/" title="Overview">
            <Grid container spacing={3} alignItems="stretch">
                {entityWarningContent}
                <Grid item md={6}>
                    <EntityAboutCard variant="gridItem" />
                </Grid>
                <Grid item md={6} xs={12}>
                    <EntityCatalogGraphCard variant="gridItem" height={400} />
                </Grid>
                <Grid item md={6}>
                    <EntityHasSystemsCard variant="gridItem" />
                </Grid>
            </Grid>
        </EntityLayout.Route>
    </EntityLayout>
);