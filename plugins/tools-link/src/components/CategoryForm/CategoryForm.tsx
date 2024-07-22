import React, { useState, useEffect } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { toolLinksApiRef, Category } from '../../api';

interface CategoryFormProps {
    onSuccess: () => void;
    category?: Category | null;
}

export const CategoryForm = ({ onSuccess, category }: CategoryFormProps) => {
    const api = useApi(toolLinksApiRef);
    const [title, setTitle] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (category) {
            setTitle(category.title);
            setIsExpanded(category.isExpanded);
        }
    }, [category]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (category) {
            await api.updateCategory(category.id, title, isExpanded);
        } else {
            await api.createCategory(title, isExpanded);
        }
        setTitle('');
        setIsExpanded(false);
        onSuccess();
    };

    return (
        <form id="category-form" onSubmit={handleSubmit}>
            <TextField
                label="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isExpanded}
                        onChange={e => setIsExpanded(e.target.checked)}
                    />
                }
                label="Is Expanded"
            />
        </form>
    );
};