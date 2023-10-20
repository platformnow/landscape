import { Button, IconButton, useMediaQuery } from '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import React from 'react';
import { BackstageTheme } from '@backstage/theme';

export type CreateCategoryButtonsProps = {
  openDialog: () => void;
};
export const CreateCategoryButton: React.FC<CreateCategoryButtonsProps> = ({
  openDialog,
}) => {
  const isXSScreen = useMediaQuery<BackstageTheme>(theme =>
    theme.breakpoints.down('xs'),
  );

  return (
    <>
      {isXSScreen ? (
        <IconButton color="primary" size="small" onClick={() => openDialog()}>
          <AddCircleOutline />
        </IconButton>
      ) : (
        <Button variant="outlined" color="primary" onClick={() => openDialog()}>
          Add Category
        </Button>
      )}
    </>
  );
};
