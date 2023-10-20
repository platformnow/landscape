import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { toolLinksPlugin, QuickAccessComponent } from '../src/plugin';

createDevApp()
  .registerPlugin(toolLinksPlugin)
  .addPage({
    element: <QuickAccessComponent />,
    title: 'Root Page',
    path: '/tool-links'
  })
  .render();
