import {defaultEntityPage} from "./DefaultEntity";
import React from 'react';
import {EntitySwitch, isComponentType} from "@backstage/plugin-catalog";
import {serviceEntityPage} from "./ServiceEntity";
import {websiteEntityPage} from "./WebsiteEntity";

export const componentPage = (
    <EntitySwitch>
        <EntitySwitch.Case if={isComponentType('service')}>
            {serviceEntityPage}
        </EntitySwitch.Case>

        <EntitySwitch.Case if={isComponentType('website')}>
            {websiteEntityPage}
        </EntitySwitch.Case>

        <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
    </EntitySwitch>
);