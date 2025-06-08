import { campaignClient } from '../../common/api/http-client';
import { CampaignQueryModel } from '../models/campaign-query.model';
import { CampaignApiModel, CampaignsApiModel } from '../models/campaign-api.model';
import { CampaignDetailsModel } from '../models/campaign.model';

export const campaignApi = {
  getCampaigns: (queryOptions: CampaignQueryModel) => {
    return campaignClient.get<CampaignsApiModel[]>('', {
      params: queryOptions,
    });
  },
  changeStatusCampaign: (campaignId: number, status: boolean) => {
    return campaignClient.put<void>(`/global/status/${campaignId}`, { status });
  },
  archiveCampaign: (campaignId: number) => {
    return campaignClient.put<void>(`/global/archive/${campaignId}`);
  },
  getCampaign: (campaignId: number) => {
    return campaignClient.get<CampaignApiModel>(`/${campaignId}`);
  },
  addCampaignsDetails: (data: CampaignDetailsModel) => {
    return campaignClient.post<number>('', data);
  },
  editCampaignDetails: (campaignId: number, data: CampaignDetailsModel) => {
    return campaignClient.put<void>(`/${campaignId}`, data);
  },
};
