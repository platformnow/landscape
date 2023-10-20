import { Category, Link } from '../../api';
import { Grid, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

export type CategoryActionsProps = {
  category: Category;
  onEdit: (category: Category) => void;
  onAdd: (category: Category) => void;
  onDelete: (category: Category) => void;
  onEditLinks: (links: Link[]) => void;
};

export const CategoryActions: React.FC<CategoryActionsProps> = ({
  category,
  onEdit,
  onAdd,
  onDelete,
  onEditLinks,
}) => {
  return (
      <Grid container spacing={1}>
          <Grid item>
              <IconButton onClick={() => onAdd(category)}>
                  <AddIcon />
              </IconButton>
          </Grid>
          <Grid item>
              <IconButton onClick={() => onEdit(category)}>
                  <EditIcon />
              </IconButton>
          </Grid>
          <Grid item>
              <IconButton onClick={() => onDelete(category)}>
                  <DeleteIcon />
              </IconButton>
          </Grid>
          <Grid item>
              <IconButton onClick={() => onEditLinks(category.links)}>
                  <LinkIcon />
              </IconButton>
          </Grid>
      </Grid>
  );
};
