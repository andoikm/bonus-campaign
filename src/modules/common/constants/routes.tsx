export const CAMPAIGN_ROUTE = '/:siteId';
export const CAMPAIGN_CREATE_ROUTE = `${CAMPAIGN_ROUTE}/create`;
export const CAMPAIGN_EDIT_ROUTE = `${CAMPAIGN_ROUTE}/edit/:campaignId`;

export const getCampaignRoute = (siteId: number) => `/${siteId}`;

export const getCampaignEditRoute = (siteId: number, campaignId: number) =>
  `/${siteId}/edit/${campaignId}`;

export const getCampaignCreateRoute = (siteId: number) => `/${siteId}/create`;
