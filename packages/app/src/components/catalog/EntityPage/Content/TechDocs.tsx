import {EntityTechdocsContent} from "@backstage/plugin-techdocs";
import {TechDocsAddons} from "@backstage/plugin-techdocs-react";
import {ReportIssue} from "@backstage/plugin-techdocs-module-addons-contrib";
import React from "react";

export const techdocsContent = (
    <EntityTechdocsContent>
        <TechDocsAddons>
            <ReportIssue />
        </TechDocsAddons>
    </EntityTechdocsContent>
);