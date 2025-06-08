import { useMutation } from '@tanstack/react-query';
import { CampaignDetailsModel } from '../../models/campaign.model';
import { campaignApi } from '../campaign-api';

export const useEditCampaignsDetails = (campaignId: number) => {
  return useMutation({
    mutationFn: (data: CampaignDetailsModel) => campaignApi.editCampaignDetails(campaignId, data),
  });
};
