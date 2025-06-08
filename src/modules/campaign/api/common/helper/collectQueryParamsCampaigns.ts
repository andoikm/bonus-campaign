import { CampaignQueryModel } from '../../../models/campaign-query.model';
import { QUERY } from '../../../../common/constants/filterKeys';

export const collectQueryParamsCampaigns = (searchParams: URLSearchParams): CampaignQueryModel => {
  return {
    query: searchParams.get(QUERY),
  };
};
