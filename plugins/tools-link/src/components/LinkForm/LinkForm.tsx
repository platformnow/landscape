import React, { useState, useEffect } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { TextField } from '@material-ui/core';
import { toolLinksApiRef, Link } from '../../api';

interface LinkFormProps {
  onSuccess: () => void;
  link?: Link | null;
  categoryId: string;
}

export const LinkForm = ({ onSuccess, link, categoryId }: LinkFormProps) => {
  const api = useApi(toolLinksApiRef);
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [iconUrl, setIconUrl] = useState('https://img.icons8.com/?size=100&id=80410&format=png&color=000000');

  useEffect(() => {
    if (link) {
      setLabel(link.label);
      setUrl(link.url);
      setIconUrl(link.iconUrl);
    }
  }, [link]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (link) {
      await api.updateLink(link.id, categoryId, iconUrl, label, url);
    } else {
      await api.createLink(categoryId, iconUrl, label, url);
    }
    setLabel('');
    setUrl('');
    setIconUrl('');
    onSuccess();
  };

  return (
    <form id="link-form" onSubmit={handleSubmit}>
      {iconUrl && <img src={iconUrl} alt="icon" style={{ width: 50, height: 50, marginTop: 10 }} />}
      <TextField
        label="Name"
        value={label}
        onChange={e => setLabel(e.target.value)}
        fullWidth
      />
      <TextField
        label="URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        fullWidth
      />
      <TextField
        label="Icon URL"
        value={iconUrl}
        onChange={e => setIconUrl(e.target.value)}
        fullWidth
      />

    </form>
  );
};