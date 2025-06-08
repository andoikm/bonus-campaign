import { useMutation } from '@tanstack/react-query';
import { campaignApi } from '../campaign-api';

export const UseArchiveCampaigns = () => {
  return useMutation({
    mutationFn: (campaignId: number) => campaignApi.archiveCampaign(campaignId),
  });
};
