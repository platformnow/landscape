import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Category } from '../../api';
import { Alert } from '@material-ui/lab';

type CategoryDeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  category: Category;
};

export const CategoryDeleteDialog: React.FC<CategoryDeleteDialogProps> = ({
  open,
  onClose,
  onDelete,
  category,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete {category?.title} </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this category?
        </DialogContentText>
        <Alert severity="warning">
          This will also delete all the links in this category!
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="secondary" onClick={onDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
