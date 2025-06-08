import { WebsiteModel } from '../models/website.model';
import { websitesClient } from './http-client';

export const websitesApi = {
  getAll() {
    return websitesClient.get<WebsiteModel[]>('/all');
  },

  getByID(id: number) {
    return websitesClient.get<WebsiteModel>(`/${id}`);
  },
};
