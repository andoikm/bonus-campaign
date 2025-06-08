import { Dayjs } from 'dayjs';

export interface CampaignRowModel {
  id: number;
  systemName: string;
  status: boolean;
  configurationCurrency: string;
  startDate: string;
  endDate: string;
  updatedAt: string;
}

export interface CampaignDetailsModel {
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
