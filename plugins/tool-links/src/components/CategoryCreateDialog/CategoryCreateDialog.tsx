import React, { useState } from 'react';
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

type CategoryCreateDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (category: Category) => void;
};

export const CategoryCreateDialog: React.FC<CategoryCreateDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCreate = () => {
    const newCategory = {
      id: '', // You might need a way to generate or obtain this ID
      title,
      isExpanded,
      links: [],
    };
    onCreate(newCategory);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Category</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          margin="dense"
          placeholder="Give your category a title"
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
            handleCreate();
            onClose();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
