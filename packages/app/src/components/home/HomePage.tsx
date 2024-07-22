import {
    HomePageCompanyLogo,
    HomePageStarredEntities,
    ClockConfig, WelcomeTitle, HeaderWorldClock, HomePageRecentlyVisited, HomePageRandomJoke,
} from '@backstage/plugin-home';
import {Content, Page, Header} from '@backstage/core-components';
import { HomePageSearchBar } from '@backstage/plugin-search';
import {
    SearchContextProvider,
} from '@backstage/plugin-search-react';
import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useLogoStyles } from './shared';
import {ToolLinksComponent} from '@internal/backstage-plugin-tools-link';
import {LandscapeLogo} from "./LandscapeLogo";
import { FeatureFlagged } from '@backstage/core-app-api';

const clockConfigs: ClockConfig[] = [
    {
        label: 'GMT',
        timeZone: 'Europe/London',
    },
    {
        label: 'PST',
        timeZone: 'America/Los_Angeles',
    },
    {
        label: 'IDT',
        timeZone: 'Asia/Tel_Aviv',
    },
    {
        label: 'UKR',
        timeZone: 'Europe/Kiev',
    },
    {
        label: 'SGT',
        timeZone: 'Asia/Singapore',
    },
    {
        label: 'AEST',
        timeZone: 'Australia/Sydney',
    },
];

const timeFormat: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
};

const useStyles = makeStyles(theme => ({
    searchBarInput: {
        maxWidth: '60vw',
        margin: 'auto',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '50px',
        boxShadow: theme.shadows[1],
    },
    searchBarOutline: {
        borderStyle: 'none'
    }
}));


export const HomePage = () => {
    const classes = useStyles();
    const { svg, path, container } = useLogoStyles();
    const languages = ['English', 'French', 'Arabic', 'Bengali', 'Chinese', 'Hebrew']

    return (
        <SearchContextProvider>
            <Page themeId="home">
                <Header title={<WelcomeTitle language={languages} />} pageTitleOverride="Home">
                    <HeaderWorldClock
                        clockConfigs={clockConfigs}
                        customTimeFormat={timeFormat}
                    />
                </Header>
                <Content>
                    <Grid container justifyContent="center" spacing={6}>
                        <HomePageCompanyLogo
                            className={container}
                            logo={<LandscapeLogo classes={{ svg, path }} />}
                        />
                        <Grid container item xs={12} justifyContent='center'>
                            <HomePageSearchBar
                                InputProps={{ classes: { root: classes.searchBarInput, notchedOutline: classes.searchBarOutline }}}
                                placeholder="Search"
                            />
                        </Grid>
                        <Grid container item xs={12}>
                            <FeatureFlagged with="homepage-tools-link">
                                <Grid item xs={12} md={6}>
                                    <ToolLinksComponent />
                                </Grid>
                            </FeatureFlagged>

                            <Grid item xs={12} md={6}>
                                <Grid container justifyContent='center'>
                                    <Grid item xs={12}>
                                        <HomePageStarredEntities />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <HomePageRecentlyVisited />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <HomePageRandomJoke />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Content>
            </Page>
        </SearchContextProvider>
    );
};