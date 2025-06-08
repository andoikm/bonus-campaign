import { useMutation } from '@tanstack/react-query';
import { campaignApi } from '../campaign-api';

export const useChangeStatusCampaigns = () => {
  return useMutation({
    mutationFn: (payload: { campaignId: number; status: boolean }) =>
      campaignApi.changeStatusCampaign(payload.campaignId, payload.status),
  });
};
