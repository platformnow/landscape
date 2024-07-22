import { createApiRef } from '@backstage/core-plugin-api';

export const toolLinksApiRef = createApiRef<ToolLinksApi>({
  id: 'tools-link',
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

  createCategory(title: string, isExpanded: boolean): Promise<string>;
  getCategory(categoryId: string): Promise<Category>;
  updateCategory(categoryId: string, title: string, isExpanded: boolean): Promise<void>;
  deleteCategory(categoryId: string): Promise<void>;

  createLink(categoryId: string, iconUrl: string, label: string, url: string): Promise<string>;
  getLink(linkId: string): Promise<Link>;
  updateLink(linkId: string, categoryId: string, iconUrl: string, label: string, url: string): Promise<void>;
  deleteLink(linkId: string): Promise<void>;
}