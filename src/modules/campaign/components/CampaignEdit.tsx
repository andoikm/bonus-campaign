import { FC, useState } from 'react';
import { useWebsite } from '../../common/context/WebSiteProvider';
import { Stack } from '@mui/material';
import { CampaignDetails, CampaignDetailsEnum } from './CampaignDetails/CampaignDetails';
import { CampaignBonuses } from './CampaignBonuses/CampaignBonuses';
import { useGetCampaignDetails } from '../api/hooks/useGetCampaignDetails';
import { useParams } from 'react-router-dom';
import { CampaignDetailsModel } from '../models/campaign.model';
import { WithLoading } from '../../common/components/hoc/WithLoading';
import dayjs from 'dayjs';
import { CampaignApiModel } from '../models/campaign-api.model';

export const CampaignEdit: FC = () => {
  const { campaignId } = useParams();
  const website = useWebsite();
  const [detailsEditMode, setDetailsEditMode] = useState<boolean>(false);

  const { data: campaignDetails, isLoading: campaignLoading } =
    useGetCampaignDetails<CampaignDetailsModel>(
      +campaignId!,
      (data: CampaignApiModel): CampaignDetailsModel => {
        return {
          ...data,
          titleTranslations: {
            [website.defaultLanguage]: data.systemName,
            ...data.titleTranslations,
          },
          startDate: dayjs(data.startDate),
          endDate: dayjs(data.endDate),
        };
      }
    );

  return (
    <WithLoading loading={campaignLoading} height="100vh">
      <Stack spacing={2} height="100%">
        {!detailsEditMode && campaignDetails && (
          <CampaignDetails
            mode={CampaignDetailsEnum.VIEW}
            onClickEdit={() => setDetailsEditMode(!detailsEditMode)}
            {...campaignDetails}
          />
        )}
        {detailsEditMode && campaignDetails && (
          <CampaignDetails
            mode={CampaignDetailsEnum.EDIT}
            defaultValues={campaignDetails}
            onCancel={() => setDetailsEditMode(false)}
            onSuccessCallback={() => setDetailsEditMode(false)}
          />
        )}
        <CampaignBonuses />
      </Stack>
    </WithLoading>
  );
};
