import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CampaignLayout } from './components/CampaignLayout';
import { RedirectToDefaultList } from './components/RedirectToDefaultList';
import {
  CAMPAIGN_CREATE_ROUTE,
  CAMPAIGN_EDIT_ROUTE,
  CAMPAIGN_ROUTE,
} from '../common/constants/routes';
import { CampaignListContainer } from './components/CampaignListContainer';
import { CampaignCreate } from './components/CampaignCreate';
import { CampaignEdit } from './components/CampaignEdit';
import { WebsiteProvider } from '../common/context/WebSiteProvider';

export const CampaignRoutes: FC = () => {
  return (
    <Routes>
      <Route path="" element={<CampaignLayout />}>
        <Route path="/" element={<RedirectToDefaultList />} />
        <Route path={CAMPAIGN_ROUTE} element={<CampaignListContainer />} />
      </Route>
      <Route
        path={CAMPAIGN_CREATE_ROUTE}
        element={
          <WebsiteProvider>
            <CampaignCreate />
          </WebsiteProvider>
        }
      />
      <Route
        path={CAMPAIGN_EDIT_ROUTE}
        element={
          <WebsiteProvider>
            <CampaignEdit />
          </WebsiteProvider>
        }
      />
    </Routes>
  );
};
