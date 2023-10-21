import { createBackend } from '@backstage/backend-defaults';
import { legacyPlugin } from '@backstage/backend-common';

const backend = createBackend();
backend.add(legacyPlugin('auth', import('./plugins/auth')));
backend.add(legacyPlugin('catalog', import('./plugins/catalog')));
backend.add(legacyPlugin('devtools', import('./plugins/devtools')));
backend.add(legacyPlugin('healthcheck', import('./plugins/healthcheck')));
backend.add(legacyPlugin('proxy', import('./plugins/proxy')));
backend.add(legacyPlugin('scaffolder', import('./plugins/scaffolder')));
backend.add(legacyPlugin('search', import('./plugins/search')));
backend.add(legacyPlugin('techdocs', import('./plugins/techdocs')));
backend.add(legacyPlugin('tool-links', import('./plugins/tool-links')));
backend.start();