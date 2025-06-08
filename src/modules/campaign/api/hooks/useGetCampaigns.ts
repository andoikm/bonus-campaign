import { CampaignQueryModel } from '../../models/campaign-query.model';
import { CampaignsApiModel } from '../../models/campaign-api.model';
import { useQuery } from '@tanstack/react-query';
import { campaignApi } from '../campaign-api';
import { CAMPAIGNS_QUERY_KEY } from '../../../common/constants/queryClientKeys';

export const useGetCampaigns = <T>(
  queryOptions: CampaignQueryModel,
  select?: (data: CampaignsApiModel[]) => T
) => {
  return useQuery({
    queryKey: [CAMPAIGNS_QUERY_KEY, queryOptions],
    queryFn: async () => {
      const { data } = await campaignApi.getCampaigns(queryOptions);
      return data;
    },
    select,
  });
};
