import { useQuery } from '@tanstack/react-query';
import { GET_CAMPAIGN_QUERY_KEY } from '../../../common/constants/queryClientKeys';
import { campaignApi } from '../campaign-api';
import { CampaignApiModel } from '../../models/campaign-api.model';

export const useGetCampaignDetails = <T>(
  campaignId: number,
  select?: (data: CampaignApiModel) => T
) => {
  return useQuery({
    queryKey: [GET_CAMPAIGN_QUERY_KEY, campaignId],
    queryFn: async () => {
      const { data } = await campaignApi.getCampaign(campaignId);
      return data;
    },
    select,
  });
};
