import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';
import { Category, Link, ToolLinksApi } from './ToolLinksApi';

export class ToolLinksClient implements ToolLinksApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly fetchApi: FetchApi;

  constructor(options: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) {
    this.discoveryApi = options.discoveryApi;
    this.fetchApi = options.fetchApi;
  }

  private async getUrl(path: string): Promise<string> {
    const baseUrl = await this.discoveryApi.getBaseUrl('tools-link');
    return `${baseUrl}${path}`;
  }

  async createCategory(title: string, isExpanded: boolean): Promise<string> {
    const resp = await this.fetchApi.fetch(await this.getUrl('/categories'), {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ title, isExpanded }),
    });

    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }

    return await resp.json();
  }

  async getCategory(categoryId: string): Promise<Category> {
    const resp = await this.fetchApi.fetch(
      await this.getUrl(`/categories/${categoryId}`),
      {
        method: 'GET',
      },
    );

    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }

    return await resp.json();
  }

  async updateCategory(
    categoryId: string,
    title: string,
    isExpanded: boolean,
  ): Promise<void> {
    const resp = await this.fetchApi.fetch(
      await this.getUrl(`/categories/${categoryId}`),
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({ title, isExpanded }),
      },
    );

    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const resp = await this.fetchApi.fetch(
      await this.getUrl(`/categories/${categoryId}`),
      {
        method: 'DELETE',
      },
    );

    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }
  }

  async addLinkToCategory(
    categoryId: string,
    iconUrl: string,
    label: string,
    url: string,
  ): Promise<string> {
    const resp = await this.fetchApi.fetch(
      await this.getUrl(`/categories/${categoryId}/links`),
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ iconUrl, label, url }),
      },
    );

    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }

    return await resp.json();
  }

  async deleteLink(linkId: string): Promise<void> {
    const resp = await this.fetchApi.fetch(
      await this.getUrl(`/links/${linkId}`),
      {
        method: 'DELETE',
      },
    );

    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }
  }

  async updateLink(
    linkId: string,
    categoryId: string,
    iconUrl: string,
    label: string,
    url: string,
  ): Promise<void> {
    const resp = await this.fetchApi.fetch(
      await this.getUrl(`/links/${linkId}`),
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({ categoryId, iconUrl, label, url }),
      },
    );

    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }
  }

  async createLink(
    categoryId: string,
    iconUrl: string,
    label: string,
    url: string,
  ): Promise<string> {
    const resp = await this.fetchApi.fetch(await this.getUrl('/links'), {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ categoryId, iconUrl, label, url }),
    });

    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }

    return await resp.json();
  }

  async getLink(linkId: string): Promise<Link> {
    const resp = await this.fetchApi.fetch(
      await this.getUrl(`/links/${linkId}`),
      {
        method: 'GET',
      },
    );

    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }

    return await resp.json();
  }

  async listAllCategories(): Promise<Category[]> {
    const resp = await this.fetchApi.fetch(await this.getUrl('/categories'), {
      method: 'GET',
    });

    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }

    return await resp.json();
  }

  async listAllCategoriesWithLinks(): Promise<Category[]> {
    const resp = await this.fetchApi.fetch(await this.getUrl('/toolLinks'), {
      method: 'GET',
    });

    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }

    return await resp.json();
  }

  async listAllLinks(): Promise<Link[]> {
    const resp = await this.fetchApi.fetch(await this.getUrl('/links'), {
      method: 'GET',
    });

    if (!resp.ok) {
      throw await ResponseError.fromResponse(resp);
    }

    return await resp.json();
  }
}
