import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { Category, Link } from '../../api';

type LinkCreateDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreateLink: (link: Link) => void;
  category: Category;
};

export const LinkCreateDialog: React.FC<LinkCreateDialogProps> = ({
open,
onClose,
onCreateLink,
category,
}) => {
  const [label, setLabel] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateLink = () => {
    const newLink = {
      id: '',
      categoryId: category.id,
      label,
      iconUrl,
      url,
    };
    onCreateLink(newLink);
  };


  return (

      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create Link for {category.title}</DialogTitle>
        <DialogContent>
          <TextField
              fullWidth
              label="Name"
              margin="dense"
              placeholder="Give your link a name"
              required
              type="text"
              variant="standard"
              value={label}
              onChange={e => setLabel(e.target.value)}
          />
          <TextField
              fullWidth
              label="Icon"
              margin="dense"
              placeholder="The URL of the icon"
              defaultValue="/homepage/icon8/link.png"
              required
              type="text"
              variant="standard"
              value={iconUrl}
              onChange={e => setIconUrl(e.target.value)}
          />
          <TextField
              fullWidth
              label="Link"
              margin="dense"
              placeholder="URL"
              required
              type="text"
              variant="standard"
              value={url}
              onChange={e => setUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}> Cancel </Button>
          <Button color="secondary" onClick={() => {
            handleCreateLink();
            onClose();
          }}> Create </Button>
        </DialogActions>
      </Dialog>
  );
}
