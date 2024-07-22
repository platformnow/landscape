import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';
import { ErrorReport } from '../../common';
import { InfoCard } from '@backstage/core-components';
import { ComponentAccordion, HomePageToolkit } from '@backstage/plugin-home';
import { useToolLinks } from '../../hooks/useToolLinks';

const useStyles = makeStyles({
  img: {
    height: '50px',
    width: 'auto',
  },
});

export const ToolLinksComponent = () => {
  const classes = useStyles();
  const { data, error, isLoading } = useToolLinks();

  const sortCategories = (categories: any[]) => {
    return categories.sort((a, b) => {
      if (a.isExpanded === b.isExpanded) {
        return 0;
      }
      return a.isExpanded ? -1 : 1;
    });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!data) {
    return (
        <ErrorReport title="Could not fetch data." errorText="Unknown error" />
    );
  }

  if (!isLoading && !data && error) {
    return (
        <ErrorReport title="Could not fetch data." errorText={error.toString()} />
    );
  }

  const sortedData = sortCategories(data);

  return (
      <>
        <InfoCard
            title="Dev Tool Shortcuts"
            noPadding
        >
          {Array.isArray(sortedData) &&
              sortedData.map(item => (
                  <HomePageToolkit
                      key={item.title}
                      title={item.title}
                      tools={item.links.map((link: { iconUrl: any; label: string | undefined; }) => ({
                        ...link,
                        icon: (
                            <img
                                className={classes.img}
                                src={link.iconUrl}
                                alt={link.label}
                            />
                        ),
                      }))}
                      Renderer={props => (
                          <ComponentAccordion
                              expanded={item.isExpanded}
                              {...props}
                          />
                      )}
                  />
              ))}
        </InfoCard>
      </>
  );
};