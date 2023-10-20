import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  TextField,
} from '@material-ui/core';
import { Link } from '../../api';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

type LinkEditDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (links: Link[]) => void;
  onDelete: (links: Link[]) => void;
  links: Link[];
};

export const LinkEditDialog: React.FC<LinkEditDialogProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  links,
}) => {
  const [updatedLinks, setUpdatedLinks] = useState(links);
  const [linksToDelete, setLinksToDelete] = useState([] as Link[]);
  const handleSave = () => {
    if (linksToDelete.length > 0) {
      onDelete(linksToDelete);
    } else {
      onSave(updatedLinks);
    }
  };

  function deleteLink(linkToDelete: Link) {
    setUpdatedLinks(currentLinks =>
      currentLinks.filter(link => link.id !== linkToDelete.id),
    );
    setLinksToDelete(currentLinks => [...currentLinks, linkToDelete]);
  }
  function editLinkProperty(
    id: string,
    property: 'iconUrl' | 'label' | 'url',
    newValue: string,
  ) {
    setUpdatedLinks(currentLinks =>
      currentLinks.map(link => {
        if (link.id === id) {
          return { ...link, [property]: newValue };
        }
        return link;
      }),
    );
  }

  function reset() {
    setUpdatedLinks(links);
    setLinksToDelete([] as Link[]);
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Links</DialogTitle>
      <DialogContent>
        <List>
          {updatedLinks.length === 0 && linksToDelete.length === 0 && (
            <Alert severity="info">No Links to Edit. Add some!</Alert>
          )}
          {!updatedLinks.length && linksToDelete.length >= 1 && (
            <Alert severity="warning">
              Links have been deleted. Save to update
            </Alert>
          )}

          {updatedLinks.map(link => (
            <ListItem>
              <ListItemAvatar>
                <Avatar src={link.iconUrl} />
              </ListItemAvatar>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Icon"
                    margin="dense"
                    required
                    type="text"
                    variant="standard"
                    value={link.iconUrl}
                    onChange={e =>
                      editLinkProperty(link.id, 'iconUrl', e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Name"
                    margin="dense"
                    required
                    type="text"
                    variant="standard"
                    value={link.label}
                    onChange={e =>
                      editLinkProperty(link.id, 'label', e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="URL"
                    margin="dense"
                    required
                    type="text"
                    variant="standard"
                    value={link.url}
                    onChange={e =>
                      editLinkProperty(link.id, 'url', e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon
                      color="secondary"
                      onClick={() => deleteLink(link)}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          color="default"
          onClick={() => {
            handleSave();
            onClose();
          }}
          disabled={!links.length && linksToDelete.length === 0}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
