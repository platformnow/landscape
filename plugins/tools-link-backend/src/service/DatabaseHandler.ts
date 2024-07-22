import { resolvePackagePath } from '@backstage/backend-plugin-api';
import { Knex } from 'knex';

const migrationsDir = resolvePackagePath(
  '@internal/backstage-plugin-tools-link-backend',
  'migrations',
);

type Options = {
  client: Knex;
};

export class DatabaseHandler {
  static async create(options: Options): Promise<DatabaseHandler> {
    const { client } = options;

    await client.migrate.latest({
      directory: migrationsDir,
    });

    return new DatabaseHandler(client);
  }

  private readonly client: Knex;

  private constructor(client: Knex) {
    this.client = client;
  }

  // Fetch all categories with their associated links
  async listCategoriesWithLinks(): Promise<any[]> {
    const categories = await this.client('categories').select();
    for (const category of categories) {
      category.links = await this.client('links')
        .where('category_id', category.id)
        .select();
    }
    return categories;
  }

  // Fetch all categories
  async listAllCategories(): Promise<any[]> {
    return await this.client('categories').select();
  }

  // Add a new category without links
  async createCategory(title: string, isExpanded: boolean): Promise<number> {
    const [id] = await this.client('categories')
      .insert({
        title,
        isExpanded,
      })
      .returning('id');
    return id;
  }

  // Fetch a specific category by ID
  async getCategory(categoryId: string): Promise<any | null> {
    const category = await this.client('categories')
      .where('id', categoryId)
      .first();

    if (!category) return null;

    category.links = await this.client('links')
      .where('category_id', category.id)
      .select();

    return category;
  }

  // Update a category's title or isExpanded status
  async updateCategory(
    categoryId: string,
    title: string,
    isExpanded: boolean,
  ): Promise<void> {
    await this.client('categories').where('id', categoryId).update({
      title,
      isExpanded,
    });
  }

  // Delete a specific category and its associated links
  async deleteCategory(categoryId: number): Promise<void> {
    await this.client.transaction(async trx => {
      await trx('links').where('category_id', categoryId).delete();
      await trx('categories').where('id', categoryId).delete();
    });
  }

  async listAllLinks(): Promise<any[]> {
    return await this.client('links').select();
  }

  // Add a link to a specific category
  async createLink(
    categoryId: string,
    iconUrl: string,
    label: string,
    url: string,
  ): Promise<number> {
    const [id] = await this.client('links')
      .insert({
        category_id: categoryId,
        iconUrl,
        label,
        url,
      })
      .returning('id');
    return id;
  }

  // Fetch a specific link by ID
  async getLink(linkId: string): Promise<any | null> {
    return await this.client('links').where('id', linkId).first();
  }

  // Update a link's iconUrl, label, or url
  async updateLink(
    linkId: number,
    iconUrl: string,
    label: string,
    url: string,
  ): Promise<void> {
    await this.client('links').where('id', linkId).update({
      iconUrl,
      label,
      url,
    });
  }

  // Delete a specific link
  async deleteLink(linkId: number): Promise<void> {
    await this.client('links').where('id', linkId).delete();
  }
}
