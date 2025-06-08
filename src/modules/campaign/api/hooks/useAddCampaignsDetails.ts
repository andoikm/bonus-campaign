import { useMutation } from '@tanstack/react-query';
import { campaignApi } from '../campaign-api';
import { CampaignDetailsModel } from '../../models/campaign.model';

export const useAddCampaignsDetails = () => {
  return useMutation({
    mutationFn: (data: CampaignDetailsModel) => campaignApi.addCampaignsDetails(data),
  });
};
