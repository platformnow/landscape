import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { scaffolderOpenapiPlugin, ScaffolderOpenapiPage } from '../src/plugin';

createDevApp()
  .registerPlugin(scaffolderOpenapiPlugin)
  .addPage({
    element: <ScaffolderOpenapiPage />,
    title: 'Root Page',
    path: '/scaffolder-openapi'
  })
  .render();
