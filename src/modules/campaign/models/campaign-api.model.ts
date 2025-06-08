import { Dayjs } from 'dayjs';

export interface CampaignsApiModel {
  id: number;
  systemName: string;
  status: boolean;
  configurationCurrency: string;
  startDate: string;
  endDate: string;
  updatedAt: string;
}

export interface CampaignApiModel {
  id?: number;
  siteId: number;
  systemName: string;
  endDate: Dayjs | null;
  startDate: Dayjs | null;
  maxAssigneeCount: number;
  supportedCurrencies: string[];
  configurationCurrency: string;
  expirationToClaimInDays: number;
  titleTranslations: { [key: string]: string };
}

export interface CampaignChangeStatusApiModel {
  [status: string]: boolean;
}
