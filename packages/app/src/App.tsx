import React from 'react';
import { Route } from 'react-router-dom';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import {
    AlertDisplay,
    OAuthRequestDialog,
    SignInPage, SupportButton,
} from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import {AppRouter, FeatureFlagged, FlatRoutes} from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
import { githubAuthApiRef } from '@backstage/core-plugin-api';
import { DevToolsPage } from '@backstage/plugin-devtools';
import { CatalogUnprocessedEntitiesPage } from '@backstage/plugin-catalog-unprocessed-entities';
import { customDevToolsPage } from './components/devtools/CustomDevToolsPage';
import { EntityValidationPage } from '@backstage-community/plugin-entity-validation';
import { HomepageCompositionRoot } from '@backstage/plugin-home';
import { HomePage } from './components/home/HomePage';
import { ToolLinksComponent } from '@internal/backstage-plugin-tools-link';
import {RbacPage} from "@janus-idp/backstage-plugin-rbac";
import { devToolsAdministerPermission } from '@backstage/plugin-devtools-common';
import { DevtoolShortcutsPage } from '@internal/backstage-plugin-tools-link';
import {QetaPage} from "@drodil/backstage-plugin-qeta";
import { customLightTheme } from './theme/lightTheme';
import { customDarkTheme } from './theme/darkTheme';
import { useUpdateTheme } from './hooks/useUpdateTheme';
import LightIcon from '@mui/icons-material/WbSunny';
import DarkIcon from '@mui/icons-material/Brightness2';
import {UnifiedThemeProvider} from "@backstage/theme";

const app = createApp({
  apis,
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
    components: {
        SignInPage: props => (
            <SignInPage
                {...props}
                auto
                align="center"
                providers={[
                    'guest',
                    {
                        id: 'github-auth-provider',
                        title: 'GitHub',
                        message: 'Sign in using GitHub',
                        apiRef: githubAuthApiRef,
                    },
                ]}
            />
        ),
    },
    featureFlags: [
        {
            pluginId: 'sonarqube',
            name: 'sonarqube',
            description: 'Enables the sonarqube plugin',
        },
        {
            pluginId: 'nexus',
            name: 'nexus',
            description: 'Enables the Nexus plugin',
        },
        {
            pluginId: 'argocd',
            name: 'argocd',
            description: 'Enables the ArgoCD plugin',
        },
        {
            pluginId: 'devtools',
            name: 'devtools',
            description: 'Enables the Devtools plugin',
        },
        {
            pluginId: 'entity-feedback',
            name: 'entity-feedback',
            description: 'Enables the Entity Feedback plugin',
        },
        {
            pluginId: 'code-insights',
            name: 'code-insights',
            description: 'Enables the Github Code Insights plugin',
        },
        {
            pluginId: 'tools-link',
            name: 'homepage-tools-link',
            description: 'Enables the Homepage Shortcuts plugin',
        },
    ],
    themes: [
        {
            id: 'light',
            title: 'Light Theme',
            variant: 'light',
            icon: <LightIcon />,
            Provider: ({ children }) => {
                const themeColors = useUpdateTheme('light');
                return (
                    <UnifiedThemeProvider
                        theme={customLightTheme(themeColors)}
                        children={children}
                    />
                );
            },
        },
        {
            id: 'dark',
            title: 'Dark Theme',
            variant: 'dark',
            icon: <DarkIcon />,
            Provider: ({ children }) => {
                const themeColors = useUpdateTheme('dark');
                return (
                    <UnifiedThemeProvider
                        theme={customDarkTheme(themeColors)}
                        children={children}
                    />
                );
            },
        },
    ],
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<HomepageCompositionRoot />}>
        <HomePage />
    </Route>
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route
        path="/catalog-unprocessed-entities"
        element={<CatalogUnprocessedEntitiesPage />}
    />
    <Route path="/entity-validation" element={<EntityValidationPage />} />
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
    <Route path="/devtools"
      element={
      <RequirePermission permission={devToolsAdministerPermission}>
          <DevToolsPage />
      </RequirePermission>
      }
    >
        <FeatureFlagged with="devtools">
            {customDevToolsPage}
        </FeatureFlagged>
    </Route>
    <Route path="/tools-link" element={<ToolLinksComponent />} />
    <Route path="/rbac" element={<RbacPage />} />;
    <Route path="/devtool-shortcuts" element={<DevtoolShortcutsPage />} />
    <Route path="/qeta"
           element={<QetaPage
               title="Help"
               subtitle="Ask and find answers to common questions here"
               headerTooltip="Help"
               headerElements={[
                   <SupportButton title="Get external Help" />
               ]}
           />}
    />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);
