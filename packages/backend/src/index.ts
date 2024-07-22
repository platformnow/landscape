/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

import { createBackend } from '@backstage/backend-defaults';
import { legacyPlugin } from '@backstage/backend-common';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));

// scaffolder plugins
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
// https://github.com/RoadieHQ/roadie-backstage-plugins/blob/main/plugins/scaffolder-actions/scaffolder-backend-module-http-request/README.md
backend.add(import('@roadiehq/scaffolder-backend-module-http-request/new-backend'));
// https://github.com/RoadieHQ/roadie-backstage-plugins/blob/main/plugins/scaffolder-actions/scaffolder-backend-module-utils/README.md
backend.add(import('@roadiehq/scaffolder-backend-module-utils/new-backend'));


// auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));
backend.add(import('@backstage/plugin-catalog-backend-module-github-org'));
// See https://backstage.io/docs/backend-system/building-backends/migrating#the-auth-plugin
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
// See https://backstage.io/docs/auth/guest/provider

// catalog plugin
backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);

// permission plugin
// backend.add(import('@backstage/plugin-permission-backend/alpha'));
// backend.add(
//   import('@backstage/plugin-permission-backend-module-allow-all-policy'),
// );
backend.add(import('@janus-idp/backstage-plugin-rbac-backend'));

// search plugin
backend.add(import('@backstage/plugin-search-backend/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));

// argocd plugin
// @ts-ignore
backend.add(legacyPlugin('argocd', import('./plugins/argocd')));

// catalog unprocessed-entities plugin
backend.add(import('@backstage/plugin-catalog-backend-module-unprocessed'));

// devtools
backend.add(import('@backstage/plugin-devtools-backend'));

backend.add(import('@internal/backstage-plugin-tools-link-backend'));

// entity feedback
backend.add(import('@backstage-community/plugin-entity-feedback-backend'));

// sonarqube
backend.add(import('@backstage-community/plugin-sonarqube-backend')
);

// qeta Q&A
backend.add(import('@drodil/backstage-plugin-qeta-backend'));

backend.start();
