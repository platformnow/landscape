import React, { useState } from 'react';
import { Page, Header, Content, HeaderActionMenu } from '@backstage/core-components';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { CategoriesTable } from '../CategoriesTable';
import { CategoryForm } from '../CategoryForm';
import { Category } from '../../api';

export const HomeScreenShortcutsPage = () => {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleClickOpen = (category?: Category) => {
        setSelectedCategory(category || null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSuccess = () => {
        handleClose();
        window.location.reload(); // Refresh the page
    };

    const actionItems = [
        {
            label: 'Add Category',
            icon: <AddIcon />,
            onClick: () => handleClickOpen(),
        },
    ];

    return (
        <Page themeId="tool">
            <Header
                title="Home Page Shortcuts"
                subtitle="Manage home page shortcuts"
            >
                <HeaderActionMenu actionItems={actionItems} />
            </Header>

            <Content>
                <CategoriesTable onEdit={handleClickOpen} />
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        {selectedCategory ? 'Edit Category' : 'Add Category'}
                    </DialogTitle>
                    <DialogContent>
                        <CategoryForm onSuccess={handleSuccess} category={selectedCategory} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button form="category-form" type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Content>
        </Page>
    );
};