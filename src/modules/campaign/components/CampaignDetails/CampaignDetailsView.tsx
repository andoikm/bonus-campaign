import { FC } from 'react';
import { CampaignDetailsModel } from '../../models/campaign.model';
import { LayoutHeader } from '../../../common/components/layouts/LayoutHeader';
import { useTranslation } from '@softland/admin-internationalization';
import { Layout } from '../../../common/components/layouts/Layout';
import { Grid, IconButton } from '@mui/material';
import { Edit as EditFilled } from '@mui/icons-material';
import { TextFieldView } from '../../../common/components/TextFieldView';
import { DATE_FORMAT_MASK } from '../../../common/constants/constants';

export interface CampaignDetailsViewProps extends CampaignDetailsModel {
  systemName: string;
  onClickEdit: () => void;
}

export const CampaignDetailsView: FC<CampaignDetailsViewProps> = ({
  endDate,
  startDate,
  systemName,
  onClickEdit,
  maxAssigneeCount,
  supportedCurrencies,
  configurationCurrency,
  expirationToClaimInDays,
}) => {
  const { t } = useTranslation();

  return (
    <Layout px={2} gap={0}>
      <LayoutHeader
        title={t('campaign_details')}
        extraComponents={
          <IconButton size="small" onClick={() => onClickEdit()}>
            <EditFilled fontSize="small" />
          </IconButton>
        }
      />
      <Grid container spacing={2} wrap="wrap">
        <Grid item xs={12} sm={6} md={4} lg style={{ flexGrow: 1 }}>
          <TextFieldView label={t('campaign_title')} value={systemName} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg style={{ flexGrow: 1 }}>
          <TextFieldView label={t('expiration_after_assignment')} value={expirationToClaimInDays} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg style={{ flexGrow: 1 }}>
          <TextFieldView label={t('configuration_currency')} value={configurationCurrency} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg style={{ flexGrow: 1 }}>
          <TextFieldView label={t('supported_currencies')} value={supportedCurrencies.join(',')} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg style={{ flexGrow: 1 }}>
          <TextFieldView label={t('total_player_count')} value={maxAssigneeCount} />
        </Grid>
      </Grid>
      <TextFieldView
        label={t('total_player_count')}
        value={`${startDate?.format(DATE_FORMAT_MASK)} - ${endDate?.format(DATE_FORMAT_MASK)}`}
      />
    </Layout>
  );
};
