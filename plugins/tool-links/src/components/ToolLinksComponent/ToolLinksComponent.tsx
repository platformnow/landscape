import { CircularProgress, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { ErrorReport } from '../../common';
import { InfoCard } from '@backstage/core-components';
import { ComponentAccordion, HomePageToolkit } from '@backstage/plugin-home';
import { CreateCategoryButton } from '../CreateCategoryButton';
import { CategoryActions } from '../CatgeoryActions';
import { alertApiRef, errorApiRef, useApi } from '@backstage/core-plugin-api';
import { Category, Link, toolLinksApiRef } from '../../api';
import { CategoryEditDialog } from '../CategoryEditDialog';
import { useToolLinks } from '../../hooks/useToolLinks';
import { CategoryDeleteDialog } from '../CategoryDeleteDialog';
import { CategoryCreateDialog } from '../CategoryCreateDialog';
import { LinkCreateDialog } from '../LinkCreateDialog';
import {LinkEditDialog} from "../LinkEditDialog";

const useStyles = makeStyles( {
  img: {
    height: '50px',
    width: 'auto',
  },
});

export const ToolLinksComponent = () => {
  const classes = useStyles();

  const errorApi = useApi(errorApiRef);
  const alertApi = useApi(alertApiRef);
  const toolLinksApi = useApi(toolLinksApiRef);
  const [editCategoryDialog, setEditCategoryDialog] = useState(false);
  const [editLinksDialog, setEditLinksDialog] = useState(false);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const [createCategoryDialog, setCreateCategoryDialog] = useState(false);
  const [createLinkDialog, setCreateLinkDialog] = useState(false);

  const [editCategory, setEditCategory] = useState<Category | undefined>(
    undefined,
  );

  const [editLinks, setEditLinks] = useState<Link[] | undefined>(
      undefined,
  );

  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  const [deleteCategory, setDeleteCategory] = useState<Category | undefined>(
    undefined,
  );

  const { data, error, isLoading, fetchData } = useToolLinks();

  const handleCreate = async (saveCategory: Category) => {
    try {
      await toolLinksApi.createCategory(
        saveCategory.title,
        saveCategory.isExpanded,
      );
      // Trigger a refresh of the data after a new category is created
      await fetchData();

      alertApi.post({
        message: `Added Category '${saveCategory.title}' to Tool Links`,
        severity: 'success',
        display: 'transient',
      });
    } catch (e) {
      errorApi.post(e as Error);
    }
  };

  const handleCreateLink = async (saveLink: Link) => {
    try {
      await toolLinksApi.createLink(
        saveLink.categoryId,
        saveLink.iconUrl,
        saveLink.label,
        saveLink.url,
      );
      // Trigger a refresh of the data after a new category is created
      await fetchData();

      alertApi.post({
        message: `Added Link '${saveLink.label}' to Tool Links`,
        severity: 'success',
        display: 'transient',
      });

      // restore defaults
      setCreateLinkDialog(false);
      setSelectedCategory(undefined);
    } catch (e) {
      errorApi.post(e as Error);
    }
  };

  const handleEdit = async (updatedCategory: Category) => {
    try {
      await toolLinksApi.updateCategory(
        updatedCategory.id,
        updatedCategory.title,
        updatedCategory.isExpanded,
      );
      const message = `Edited category '${updatedCategory.title} in Tool Links'`;

      // Trigger a refresh of the data after a new category is created
      await fetchData();

      alertApi.post({
        message,
        severity: 'success',
        display: 'transient',
      });
    } catch (e) {
      errorApi.post(e as Error);
    }
  };
  const handleDeleteLinks = async (linksToDelete: Link[]) => {


    linksToDelete.map((link) => {
      try {
        toolLinksApi.deleteLink(
            link.id,
        );
        const message = `Deleted Links ${link.label} from Tool Links'`;
        alertApi.post({
          message,
          severity: 'success',
          display: 'transient',
        });
      } catch (e) {
        errorApi.post(e as Error);
      }
    });


    await fetchData();



  };

  const handleEditLinks = async (updatedLinks: Link[]) => {

    updatedLinks.map((link) => {
        try {
            toolLinksApi.updateLink(
                link.id,
                link.categoryId,
                link.iconUrl,
                link.label,
                link.url,
            );
        } catch (e) {
            errorApi.post(e as Error);
        }
    });
      const message = `Edited Links in Tool Links'`;

      await fetchData();

      alertApi.post({
        message,
        severity: 'success',
        display: 'transient',
      });

  };

  const handleDelete = async (categoryToDelete: Category) => {
    try {
      await toolLinksApi.deleteCategory(categoryToDelete.id);
      const message = `Deleted category '${categoryToDelete.title} from Tool Links'`;

      // Trigger a refresh of the data after a new category is created
      await fetchData();

      alertApi.post({
        message,
        severity: 'success',
        display: 'transient',
      });

      // Close the dialog after deletion
      setDeleteCategoryDialog(false);
    } catch (e) {
      errorApi.post(e as Error);
    }
  };

  // Render different content based on loading and error states
  if (isLoading) {
    return <CircularProgress />;
  }

  if (!data) {
    return (
      <ErrorReport title="Could not fetch data." errorText="Unknown error" />
    );
  }

  if (!isLoading && !data && error) {
    return (
      <ErrorReport title="Could not fetch data." errorText={error.toString()} />
    );
  }

  return (
    <>
      {selectedCategory && (
        <LinkCreateDialog
          open={createLinkDialog}
          onCreateLink={handleCreateLink}
          onClose={() => setCreateLinkDialog(false)}
          category={selectedCategory}
        />
      )}

      {deleteCategory && (
        <CategoryDeleteDialog
          open={deleteCategoryDialog}
          category={deleteCategory}
          onClose={() => setDeleteCategoryDialog(false)}
          onDelete={() => handleDelete(deleteCategory)}
        />
      )}
      <CategoryCreateDialog
        open={createCategoryDialog}
        onCreate={handleCreate}
        onClose={() => setCreateCategoryDialog(false)}
      />

      {editCategory && (
          <CategoryEditDialog
              open={editCategoryDialog}
              onSave={handleEdit}
              onClose={() => setEditCategoryDialog(false)}
              category={editCategory}
          />
      )}

      {editLinks && (
          <LinkEditDialog
              open={editLinksDialog}
              onSave={handleEditLinks}
              onDelete={handleDeleteLinks}
              onClose={() => setEditLinksDialog(false)}
              links={editLinks}
          />
      )}


      <InfoCard
        title="Tool Links"
        noPadding
        headerProps={{
          action: (
            <CreateCategoryButton
                openDialog={() => {
                  setCreateCategoryDialog(true);
                }}
            />
          ),
        }}
      >
        {Array.isArray(data) &&
          data.map(item => (
            <HomePageToolkit
              key={item.title}
              title={item.title}
              tools={item.links.map(link => ({
                ...link,
                icon: (
                  <img
                    className={classes.img}
                    src={link.iconUrl || '/homepage/icons/icons8/link.png'}
                    alt={link.label}
                  />
                ),
              }))}
              Renderer={props => (
                <ComponentAccordion
                  Actions={() => (
                    <CategoryActions
                      category={item}
                      onEdit={() => {
                        setEditCategory(item);
                        setEditCategoryDialog(true);
                      }}
                      onDelete={() => {
                        setDeleteCategoryDialog(true);
                        setDeleteCategory(item);
                      }}
                      onAdd={() => {
                        setCreateLinkDialog(true);
                        setSelectedCategory(item);
                      }}
                      onEditLinks={() => {
                        setEditLinksDialog(true);
                        setEditLinks(item.links);
                        setEditCategoryDialog(false);
                        setEditCategory(undefined);
                      }}

                    />
                  )}
                  expanded={item.isExpanded}
                  {...props}
                />
              )}
            />
          ))}
      </InfoCard>
    </>
  );
};
