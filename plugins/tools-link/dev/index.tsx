import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { toolLinksPlugin, ToolLinksComponent } from '../src';

createDevApp()
    .registerPlugin(toolLinksPlugin)
    .addPage({
        element: <ToolLinksComponent />,
        title: 'Root Page',
        path: '/tools-link'
    })
    .render();
