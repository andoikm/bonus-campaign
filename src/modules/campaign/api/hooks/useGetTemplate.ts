import { useQuery } from '@tanstack/react-query';
import { templatesApi } from '../templates-api';
import { GET_TEMPLATE_QUERY_KEY } from '../../../common/constants/queryClientKeys';
import { TemplateApiModel } from '../../models/templates-api.model';

export const useGetTemplate = <T>(templateId: number, select?: (data: TemplateApiModel) => T) => {
  return useQuery({
    queryKey: [GET_TEMPLATE_QUERY_KEY, templateId],
    queryFn: async () => {
      const { data } = await templatesApi.getTemplate(templateId);
      return data;
    },
    select,
  });
};
