import {
    HomePageToolkit,
    HomePageCompanyLogo,
    HomePageStarredEntities,
    TemplateBackstageLogo,
    ClockConfig, WelcomeTitle, HeaderWorldClock, ComponentAccordion,
} from '@backstage/plugin-home';
import {Content, Page, Header, InfoCard} from '@backstage/core-components';
import { HomePageSearchBar } from '@backstage/plugin-search';
import {
    SearchContextProvider,
} from '@backstage/plugin-search-react';
import { Grid, makeStyles} from '@material-ui/core';
import React from 'react';
import {
    HomePageRequestedReviewsCard,
    HomePageYourOpenPullRequestsCard
} from "@roadiehq/backstage-plugin-github-pull-requests";

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
    },
    img: {
        height: '40px',
        width: 'auto',
    },
    searchBar: {
        display: 'flex',
        maxWidth: '60vw',
        boxShadow: theme.shadows.at(1),
        borderRadius: '50px',
        margin: 'auto',
    },
    title: {
        'div > div > div > div > p': {
            textTransform: 'uppercase',
        },
    },
    notchedOutline: {
        borderStyle: 'none!important',
    },
}));

const useLogoStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(5, 0),
    },
    svg: {
        width: 'auto',
        height: 100,
    },
    path: {
        fill: '#7df3e1',
    },
}));

const data = [
    {
        "title": "Communication",
        "isExpanded": false,
        "links": [
            {
                "iconUrl": "/homepage/icons/icons8/slack-new.png",
                "label": "Slack",
                "url": "https://777traveltech.slack.com/"
            },
            {
                "iconUrl": "/homepage/icons/icons8/google-meet.png",
                "label": "Meet",
                "url": "https://meet.google.com/"
            },
            {
                "iconUrl": "/homepage/icons/icons8/skype.png",
                "label": "Skype",
                "url": "https://www.skype.com/en/"
            },
        ]
    },
    {
        "title": "Source Code Management",
        "isExpanded": false,
        "links": [
            {
                "iconUrl": "/homepage/icons/icons8/github.png",
                "label": "GitHub",
                "url": "https://github.com/orgs/go7-io"
            },
            {
                "iconUrl": "/homepage/icons/icons8/gitlab.png",
                "label": "Gitlab",
                "url": "https://gitlab.lenderos.com"
            },
            {
                "iconUrl": "/homepage/icons/icons8/bitbucket.png",
                "label": "Bitbucket",
                "url": "https://bitbucket.org/aerocrs/workspace/overview/"
            },
        ]
    },
    {
        "title": "Developer",
        "isExpanded": false,
        "links": [
            {
                "iconUrl": "/homepage/icons/icons8/docker.png",
                "label": "Docker",
                "url": "https://www.docker.com/products/docker-desktop/"
            }

        ]
    },
    {
        "title": "Infrastructure",
        "isExpanded": false,
        "links": [
            {
                "iconUrl": "/homepage/icons/icons8/google-cloud.png",
                "label": "GCP",
                "url": "https://cloud.google.com/"
            },
            {
                "iconUrl": "/homepage/icons/icons8/aws.png",
                "label": "AWS",
                "url": "https://eu-north-1.signin.aws.amazon.com/oauth?client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Fcanvas&code_challenge=mEvwZLBwmNIM2lJglD0tPHn6olXohaHdFHspE2FS-4E&code_challenge_method=SHA-256&response_type=code&redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fconsole%2Fhome%3FhashArgs%3D%2523%26isauthcode%3Dtrue%26state%3DhashArgsFromTB_eu-north-1_074d63ec30726cdd&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmV1LW5vcnRoLTEiRzBFAiEAhhF9St4jepPD19%2FRQPI8Vnt5Y9GxCQqdR0L3IBz4zaACIDDKmED2rnd%2BSix7QtWJOHP%2FNeLRiiTNvZw4GtyP%2FdfzKooCCBIQAhoMODAyNzcwMDY0NDczIgy1SyFS%2FhDXs08tiPIq5wFjBlhZLf49JUf1FlZgwVepfbTYLR%2Fl0N9bHsLN7L9OA6hnXgeW0nPJMJ7y5zTa6lE1oUinh57a3uCd6NauVlpi7kBOj24Noekq9unk3GKjvbeXzkMq4NN4NHeLghpd6SZNoF8jpAjowOnlE8lV9KoAZI50rnTF55mPXmZtZRUaX0%2B0L9vVInGEFCicJMOHUPAtjndM7y93lr6JwVilQBKnxvSx%2FcB8cYL5E9gqFpJK40WkE%2B%2Fk1CdJgoG664Lo6LkJREknNnDwiU99rfs3MdOSq6Pq0QBXBJUOLH%2BT8AcQkj%2BIl%2FHp3qYw1LuPpQY6jwFfisTLfmZceX1wcji5rGBrjBc9q5fZh5VgB3R5K2xlb4cULjjj9mhG4GLqNPBK0vJVTWtSd78DMa%2B%2FshlRNJ7NeYBG15JHR2%2FqcQ2DP83bl0azU%2B3FzJWWiAIpjbJro86onZQ5ifk%2BmY4UWnhTEP%2Fqn4VxOQsX1A5WrisNN4HJLA0ZkrAxffNVapUK%2BO8ZKQ%3D%3D&X-Amz-Date=20230704T085844Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3V2GTCRM7S4ADV67%2F20230704%2Feu-north-1%2Fsignin%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d28b71603a80bc4ca40679c76dac2b868bcba06021a10761ee5601a9047910b4"
            },

        ]
    },
    {
        "title": "CI/CD",
        "isExpanded": false,
        "links": [
            {
                "iconUrl": "/homepage/icons/argo-icon-color.svg",
                "label": "ArgoCD",
                "url": "https://argocd-dev.worldticket.net/"
            },
            {
                "iconUrl": "/homepage/icons/sonarqube.svg",
                "label": "SonarQube",
                "url": "https://sq.worldticket.net/"
            },
            {
                "iconUrl": "/homepage/icons/nexus.png",
                "label": "Nexus",
                "url": "https://nxs.worldticket.net/"
            }
        ]
    },
    {
        "title": "Clusters",
        "isExpanded": false,
        "links": [
            {
                "iconUrl": "/homepage/icons/icons8/kubernetes.png",
                "label": "Hub Dev",
                "url": ""
            }
        ]
    },
    {
        "title": "Monitoring",
        "isExpanded": false,
        "links": [
            {
                "iconUrl": "/homepage/icons/icons8/system-task.png",
                "label": "Grafana (Coming Soon)",
                "url": ""
            }
        ]
    },
    {
        "title": "Security",
        "isExpanded": false,
        "links": [
            {
                "iconUrl": "/homepage/icons/icons8/security-checked.png",
                "label": "GitHub Security",
                "url": "https://github.com/orgs/GO7-io/security/risk"
            },
            {
                "iconUrl": "/homepage/icons/keycloak.svg",
                "label": "Keycloak",
                "url": "https://keycloak.org/"
            }
        ]
    }
]

const QuickAccess = () => {
    const classes = useStyles();
    // const { data, error, isLoading } = useQuickAccess();
    //
    // if (isLoading) {
    //     return <CircularProgress />;
    // }
    //
    // if (!data) {
    //     return (
    //         <ErrorReport title="Could not fetch data." errorText="Unknown error" />
    //     );
    // }
    //
    // if (!isLoading && !data && error) {
    //     return (
    //         <ErrorReport title="Could not fetch data." errorText={error.toString()} />
    //     );
    // }

    return (
        <InfoCard title="Tool Links" noPadding className={classes.title}>
            {data.map(item => (
                <HomePageToolkit
                    key={item.title}
                    title={item.title}
                    tools={item.links.map(link => ({
                        ...link,
                        icon: (
                            <img
                                className={classes.img}
                                src={link.iconUrl}
                                alt={link.label}
                            />
                        ),
                    }))}
                    Renderer={
                        item.isExpanded
                            ? props => <ComponentAccordion expanded {...props} />
                            : props => <ComponentAccordion {...props} />
                    }
                />
            ))}
        </InfoCard>
    );
};

export const HomePage = () => {
    const classes = useStyles();
    const { svg, path, container } = useLogoStyles();

    return (
        <SearchContextProvider>
            <Page themeId="home">
                <Header title={<WelcomeTitle />} pageTitleOverride="Home">
                    <HeaderWorldClock
                        clockConfigs={clockConfigs}
                        customTimeFormat={timeFormat}
                    />
                </Header>
                <Content>
                    <Grid container justifyContent="center" spacing={6}>
                        <HomePageCompanyLogo
                            className={container}
                            logo={<TemplateBackstageLogo classes={{ svg, path }} />}
                        />
                        <Grid container item xs={12} justifyContent='center'>
                            <HomePageSearchBar
                                InputProps={{ classes: { root: classes.searchBarInput, notchedOutline: classes.searchBarOutline }}}
                                placeholder="Search"
                            />
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={12} md={6}>
                                <QuickAccess />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <HomePageStarredEntities title="Favorites" />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <HomePageRequestedReviewsCard />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <HomePageYourOpenPullRequestsCard title="My Pull Requests" query="is:open is:pr author:@me" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Content>
            </Page>
        </SearchContextProvider>
    );
};