import { useQuery } from '@tanstack/react-query';
import { GET_AVAILABLE_TEMPLATES_QUERY_KEY } from '../../../common/constants/queryClientKeys';
import { templatesApi } from '../templates-api';

import { TemplateBaseApiModel } from '../../models/templates-api.model';

export const useGetAvailableTemplates = <T>(
  siteId: number,
  select?: (data: TemplateBaseApiModel[]) => T
) => {
  return useQuery({
    queryKey: [GET_AVAILABLE_TEMPLATES_QUERY_KEY, siteId],
    queryFn: async () => {
      const { data } = await templatesApi.getAvailableTemplates(siteId);
      return data;
    },
    select,
  });
};
