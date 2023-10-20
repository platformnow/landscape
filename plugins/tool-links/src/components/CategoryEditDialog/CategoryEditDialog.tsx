import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from '@material-ui/core';
import { Category } from '../../api';

type CategoryEditDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
  category: Category;
};

export const CategoryEditDialog: React.FC<CategoryEditDialogProps> = ({
  open,
  onClose,
  onSave,
  category,
}) => {
  const [title, setTitle] = useState(category.title);
  const [isExpanded, setIsExpanded] = useState(category.isExpanded);

  useEffect(() => {
    setTitle(category.title);
    setIsExpanded(category.isExpanded);
  }, [category]);

  const handleSave = () => {
    const updatedCategory = {
      ...category,
      title,
      isExpanded,
    };
    onSave(updatedCategory);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          margin="dense"
          placeholder="Edit your category title"
          required
          type="text"
          variant="standard"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={isExpanded}
              onChange={() => setIsExpanded(!isExpanded)}
            />
          }
          label="Expanded"
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            handleSave();
            onClose();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
