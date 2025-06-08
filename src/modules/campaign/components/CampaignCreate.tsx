import { FC } from 'react';
import { CampaignDetails, CampaignDetailsEnum } from './CampaignDetails/CampaignDetails';
import { CampaignBonuses } from './CampaignBonuses/CampaignBonuses';
import { Stack } from '@mui/material';

export const CampaignCreate: FC = () => {
  return (
    <Stack spacing={2} height="100%">
      <CampaignDetails mode={CampaignDetailsEnum.CREATE} />
      <CampaignBonuses />
    </Stack>
  );
};
