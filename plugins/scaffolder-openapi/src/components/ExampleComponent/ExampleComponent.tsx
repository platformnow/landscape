import React from 'react';
import { Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import OpenApiForm from "./OpenApiForm";
import { RJSFSchema } from "@rjsf/utils";


const schema: RJSFSchema = {
    "properties": {
        "spec": {
            "description": "A NetworkSpec defines the desired state of a Network.",
            "properties": {
                "deletionPolicy": {
                    "default": "Delete",
                    "description": "DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either \"Delete\" or \"Orphan\" the external resource.",
                    "enum": [
                        "Orphan",
                        "Delete"
                    ],
                    "type": "string"
                },
                "forProvider": {
                    "description": "NetworkParameters define the desired state of a Google Compute Engine VPC Network. Most fields map directly to a Network: https://cloud.google.com/compute/docs/reference/rest/v1/networks",
                    "properties": {
                        "autoCreateSubnetworks": {
                            "description": "AutoCreateSubnetworks: When set to true, the VPC network is created in \"auto\" mode. When set to false, the VPC network is created in \"custom\" mode. When set to nil, the VPC network is created in \"legacy\" mode which will be deprecated by GCP soon. \n An auto mode VPC network starts with one subnet per region. Each subnet has a predetermined range as described in Auto mode VPC network IP ranges. \n This field can only be updated from true to false after creation using switchToCustomMode.",
                            "type": "boolean"
                        },
                        "routingConfig": {
                            "description": "RoutingConfig: The network-level routing configuration for this network. Used by Cloud Router to determine what type of network-wide routing behavior to enforce.",
                            "properties": {
                                "routingMode": {
                                    "description": "RoutingMode: The network-wide routing mode to use. If set to REGIONAL, this network's Cloud Routers will only advertise routes with subnets of this network in the same region as the router. If set to GLOBAL, this network's Cloud Routers will advertise routes with all subnets of this network, across regions. \n Possible values: \"GLOBAL\" \"REGIONAL\"",
                                    "enum": [
                                        "GLOBAL",
                                        "REGIONAL"
                                    ],
                                    "type": "string"
                                }
                            },
                            "required": [
                                "routingMode"
                            ],
                            "type": "object"
                        }
                    },
                    "type": "object"
                },
            },
            "required": [
                "forProvider"
            ],
            "type": "object"
        },
    }
}

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to scaffolder-openapi!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Plugin title">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="Information card">
            <OpenApiForm openApiSchema={schema} />
          </InfoCard>
        </Grid>
      </Grid>
    </Content>
  </Page>
);
