import React, { useEffect, useState } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { Table } from '@backstage/core-components';
import { toolLinksApiRef, Category, Link } from '../../api';
import {
    Switch,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    FormControlLabel,
    makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { LinkForm } from '../LinkForm';

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
}));

export const CategoriesTable = ({ onEdit }: { onEdit: (category: Category) => void }) => {
    const classes = useStyles();
    const api = useApi(toolLinksApiRef);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editLinkDialogOpen, setEditLinkDialogOpen] = useState(false);
    const [createLinkDialogOpen, setCreateLinkDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [linkToDelete, setLinkToDelete] = useState<Link | null>(null);
    const [linkToEdit, setLinkToEdit] = useState<Link | null>(null);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

    const sortCategories = (cats: Category[]) => {
        return cats.sort((a, b) => {
            if (a.isExpanded === b.isExpanded) {
                return 0;
            }
            return a.isExpanded ? -1 : 1;
        });
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await api.listAllCategoriesWithLinks();
                setCategories(sortCategories(fetchedCategories));
            } catch (e) {
                setError('Failed to fetch categories');
            }
        };

        fetchCategories();
    }, [api]);

    const handleIsExpandedChange = async (categoryId: string, isExpanded: boolean) => {
        const category = categories.find(cat => cat.id === categoryId);
        if (category) {
            try {
                await api.updateCategory(categoryId, category.title, isExpanded);
                setCategories(prev =>
                    sortCategories(prev.map(cat => (cat.id === categoryId ? { ...cat, isExpanded } : cat))),
                );
            } catch (e) {
                setError('Failed to update category');
            }
        }
    };

    const handleDeleteCategory = async () => {
        if (categoryToDelete) {
            try {
                await api.deleteCategory(categoryToDelete.id);
                setCategories(prev => prev.filter(cat => cat.id !== categoryToDelete.id));
                setDeleteDialogOpen(false);
                setCategoryToDelete(null);
            } catch (e) {
                setError('Failed to delete category');
            }
        }
    };

    const handleDeleteLink = async () => {
        if (linkToDelete) {
            try {
                await api.deleteLink(linkToDelete.id);
                setCategories(prev =>
                    prev.map(cat => ({
                        ...cat,
                        links: cat.links.filter(link => link.id !== linkToDelete.id),
                    })),
                );
                setDeleteDialogOpen(false);
                setLinkToDelete(null);
            } catch (e) {
                setError('Failed to delete link');
            }
        }
    };

    const handleEditLink = async () => {
        if (linkToEdit) {
            try {
                await api.updateLink(linkToEdit.id, linkToEdit.categoryId, linkToEdit.iconUrl, linkToEdit.label, linkToEdit.url);
                setCategories(prev =>
                    prev.map(cat =>
                        cat.id === linkToEdit.categoryId
                            ? {
                                ...cat,
                                links: cat.links.map(link =>
                                    link.id === linkToEdit.id
                                        ? { ...link, label: linkToEdit.label, url: linkToEdit.url, iconUrl: linkToEdit.iconUrl }
                                        : link,
                                ),
                            }
                            : cat,
                    ),
                );
                setEditLinkDialogOpen(false);
                setLinkToEdit(null);
            } catch (e) {
                setError('Failed to update link');
            }
        }
    };

    return (
        <>
            {error && <div>{error}</div>}
            {categories.map(category => (
                <Accordion key={category.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel-${category.id}-content`}
                        id={`panel-${category.id}-header`}
                    >
                        <Typography>{category.title}</Typography>
                        <Box marginLeft="auto" display="flex" alignItems="center">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={category.isExpanded}
                                        onChange={() => handleIsExpandedChange(category.id, !category.isExpanded)}
                                    />
                                }
                                label="Is Expanded"
                            />
                            <IconButton onClick={() => onEdit(category)} color="primary">
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    setCategoryToDelete(category);
                                    setDeleteDialogOpen(true);
                                }}
                                color="secondary"
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    setCurrentCategory(category);
                                    setCreateLinkDialogOpen(true);
                                }}
                                color="primary"
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.container}>
                            {category.links && category.links.length > 0 ? (
                                <Table
                                    title="Links"
                                    options={{ search: false, paging: false }}
                                    columns={[
                                        {
                                            title: 'Icon',
                                            field: 'iconUrl',
                                            render: rowData => <img src={rowData.iconUrl} alt="icon" style={{ width: 50, height: 50 }} />,
                                        },
                                        { title: 'Name', field: 'label' },
                                        { title: 'URL', field: 'url' },
                                        {
                                            title: 'Actions',
                                            field: 'actions',
                                            render: rowData => (
                                                <>
                                                    <IconButton
                                                        onClick={() => {
                                                            setLinkToEdit(rowData as Link);
                                                            setEditLinkDialogOpen(true);
                                                        }}
                                                        color="primary"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => {
                                                            setLinkToDelete(rowData as Link);
                                                            setDeleteDialogOpen(true);
                                                        }}
                                                        color="secondary"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            ),
                                        },
                                    ]}
                                    data={category.links}
                                />
                            ) : (
                                <Typography>No links available</Typography>
                            )}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="delete-dialog-title"
            >
                <DialogTitle id="delete-dialog-title">Delete {categoryToDelete ? 'Category' : 'Link'}</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete the {categoryToDelete ? `category "${categoryToDelete?.title}"` : `link "${linkToDelete?.label}"`}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={categoryToDelete ? handleDeleteCategory : handleDeleteLink} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={editLinkDialogOpen}
                onClose={() => setEditLinkDialogOpen(false)}
                aria-labelledby="edit-dialog-title"
            >
                <DialogTitle id="edit-dialog-title">Edit Link</DialogTitle>
                <DialogContent>
                    {linkToEdit && (
                        <LinkForm
                            categoryId={linkToEdit.categoryId}
                            link={linkToEdit}
                            onSuccess={() => {
                                setEditLinkDialogOpen(false);
                                setLinkToEdit(null);
                            }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditLinkDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditLink} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={createLinkDialogOpen}
                onClose={() => setCreateLinkDialogOpen(false)}
                aria-labelledby="create-dialog-title"
            >
                <DialogTitle id="create-dialog-title">Add Link</DialogTitle>
                <DialogContent>
                    {currentCategory && (
                        <LinkForm
                            categoryId={currentCategory.id}
                            onSuccess={() => {
                                setCreateLinkDialogOpen(false);
                                setCurrentCategory(null);
                            }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCreateLinkDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button form="link-form" type="submit" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}