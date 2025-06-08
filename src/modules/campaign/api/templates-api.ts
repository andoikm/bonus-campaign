import { templatesClient } from '../../common/api/http-client';
import { TemplateApiModel, TemplateBaseApiModel } from '../models/templates-api.model';

export const templatesApi = {
  getAvailableTemplates: (siteId: number) => {
    return templatesClient.get<TemplateBaseApiModel[]>(`/available/site/${siteId}`);
  },
  getTemplate: (templateId: number) => {
    return templatesClient.get<TemplateApiModel>(`/${templateId}`);
  },
};
