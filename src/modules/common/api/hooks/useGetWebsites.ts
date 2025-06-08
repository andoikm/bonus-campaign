import { WEBSITES_QUERY_KEY } from '../../constants/queryClientKeys';
import { useQuery } from '@tanstack/react-query';
import { websitesApi } from '../websites.api';
import { WebsiteModel } from '../../models/website.model';

export const useGetWebsites = <T>(
  select?: (data: WebsiteModel[]) => T,
  onSuccess?: (data: T) => void
) => {
  return useQuery({
    queryKey: [WEBSITES_QUERY_KEY],
    queryFn: async () => {
      const { data } = await websitesApi.getAll();
      return data;
    },
    select,
    onSuccess,
  });
};
