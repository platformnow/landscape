import { createApiRef } from '@backstage/core-plugin-api';

export const toolLinksApiRef = createApiRef<ToolLinksApi>({
  id: 'tool-links',
});

export interface Category {
  id: string;
  title: string;
  isExpanded: boolean;
  links: Link[];
}

export interface Link {
  id: string;
  categoryId: string;
  iconUrl: string;
  label: string;
  url: string;
}

export interface ToolLinksApi {
  listAllCategoriesWithLinks(): Promise<Category[]>;

  listAllCategories(): Promise<Category[]>;

  listAllLinks(): Promise<Link[]>;

  // Creates a new category and returns its id
  createCategory(title: string, isExpanded: boolean): Promise<string>;

  // Returns a category by id with its links
  getCategory(categoryId: string): Promise<Category>;

  // Updates a category by id
  updateCategory(
    categoryId: string,
    title: string,
    isExpanded: boolean,
  ): Promise<void>;

  // Deletes a category by id
  deleteCategory(categoryId: string): Promise<void>;

  // Creates a new link and returns its id
  createLink(
    categoryId: string,
    iconUrl: string,
    label: string,
    url: string,
  ): Promise<string>;

  // Updates a link by id
  getLink(linkId: string): Promise<Link>;

  // Updates a link by id
  updateLink(
    linkId: string,
    categoryId: string,
    iconUrl: string,
    label: string,
    url: string,
  ): Promise<void>;

  // Deletes a link by id
  deleteLink(linkId: string): Promise<void>;
}
