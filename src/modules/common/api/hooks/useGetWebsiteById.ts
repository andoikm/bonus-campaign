import { useQuery } from '@tanstack/react-query';
import { GET_WEBSITE_BY_ID_QUERY_KEY } from '../../constants/queryClientKeys';
import { websitesApi } from '../websites.api';

export const useGetWebsiteById = (id: number) => {
  return useQuery({
    queryKey: [GET_WEBSITE_BY_ID_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await websitesApi.getByID(id);
      return data;
    },
    enabled: !!id,
  });
};
