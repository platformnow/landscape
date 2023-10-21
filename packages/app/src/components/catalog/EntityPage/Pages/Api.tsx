import {EntityAboutCard, EntityLayout, EntityLinksCard} from "@backstage/plugin-catalog";
import {Grid} from "@material-ui/core";
import {EntityCatalogGraphCard} from "@backstage/plugin-catalog-graph";
import {
    EntityApiDefinitionCard,
    EntityConsumingComponentsCard,
    EntityProvidingComponentsCard
} from "@backstage/plugin-api-docs";
import React from "react";
import {entityWarningContent} from "../Content/EntityWarning";

export const apiPage = (
    <EntityLayout>
        <EntityLayout.Route path="/" title="Overview">
            <Grid container spacing={3}>
                {entityWarningContent}
                <Grid item md={6}>
                    <EntityAboutCard />
                </Grid>
                <Grid item md={6} xs={12}>
                    <EntityCatalogGraphCard variant="gridItem" height={400} />
                </Grid>
                <Grid item md={4} xs={12}>
                    <EntityLinksCard />
                </Grid>
                <Grid container item md={12}>
                    <Grid item md={6}>
                        <EntityProvidingComponentsCard />
                    </Grid>
                    <Grid item md={6}>
                        <EntityConsumingComponentsCard />
                    </Grid>
                </Grid>
            </Grid>
        </EntityLayout.Route>

        <EntityLayout.Route path="/definition" title="Definition">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <EntityApiDefinitionCard />
                </Grid>
            </Grid>
        </EntityLayout.Route>
    </EntityLayout>
);