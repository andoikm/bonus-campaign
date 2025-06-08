import { useTranslation } from '@softland/admin-internationalization';
import { FC } from 'react';
import { SimpleListLayout } from '../../common/components/layouts/SimpleListLayout';
import { Outlet } from 'react-router-dom';
import { WebsitesSelect } from '../../common/components/WebsitesSelect';
import { useNavigateWithBasepath } from '../../common/utils/hooks/useNavigateWithBasepath';
import { getCampaignRoute } from '../../common/constants/routes';

export const CampaignLayout: FC = () => {
  const { t } = useTranslation();
  const navigateWithBasepath = useNavigateWithBasepath();

  const handleWebsiteChange = (siteId: number) => {
    navigateWithBasepath(getCampaignRoute(siteId));
  };

  return (
    <SimpleListLayout
      title={t('bonus_campaign')}
      headerExtraComponent={<WebsitesSelect onChange={handleWebsiteChange} />}
    >
      <Outlet />
    </SimpleListLayout>
  );
};
