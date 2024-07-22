import { useEntity } from '@backstage/plugin-catalog-react';
import { Container } from '@material-ui/core';
import { stringifyEntityRef } from '@backstage/catalog-model';
import React from 'react';
import { QuestionsContainer } from '@drodil/backstage-plugin-qeta';

export const QetaContent = () => {
    const { entity } = useEntity();

    return (
        <Container>
            <QuestionsContainer entity={stringifyEntityRef(entity)} showTitle />
        </Container>
    );
};