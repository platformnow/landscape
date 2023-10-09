import { EntitySwitch } from '@backstage/plugin-catalog';
import {
    EntityGithubActionsContent,
    isGithubActionsAvailable,
} from '@backstage/plugin-github-actions';

import React from 'react';
import {EmptyState} from "@backstage/core-components";
import {Button} from "@material-ui/core";


export const ciContent = (
    <EntitySwitch>
        <EntitySwitch.Case if={isGithubActionsAvailable}>
            <EntityGithubActionsContent />
        </EntitySwitch.Case>

        <EntitySwitch.Case>
            <EmptyState
                title="No CI available for this entity"
                missing="info"
                description="You need to add an annotation to your component if you want to enable CI for it. You can read more about annotations in Backstage by clicking the button below."
                action={
                    <Button
                        variant="contained"
                        color="primary"
                        href="https://backstage.io/docs/features/software-catalog/well-known-annotations"
                    >
                        Read more
                    </Button>
                }
            />
        </EntitySwitch.Case>
    </EntitySwitch>
);