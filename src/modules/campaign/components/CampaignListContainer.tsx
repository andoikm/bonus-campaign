import { FC, Fragment, useMemo, useState } from 'react';
import { CampaignList } from './CampaignList';
import { useNavigateWithBasepath } from '../../common/utils/hooks/useNavigateWithBasepath';
import { getCampaignCreateRoute, getCampaignEditRoute } from '../../common/constants/routes';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetCampaigns } from '../api/hooks/useGetCampaigns';
import { CampaignQueryModel } from '../models/campaign-query.model';
import { collectQueryParamsCampaigns } from '../api/common/helper/collectQueryParamsCampaigns';
import { CampaignRowModel } from '../models/campaign.model';
import dayjs from 'dayjs';
import { DATE_FORMAT_MASK } from '../../common/constants/constants';
import { Confirm } from '../../common/components/Confirm';
import { Trans, useTranslation } from '@softland/admin-internationalization';
import { useChangeStatusCampaigns } from '../api/hooks/useChangeStatusCampaigns';
import { useApiResponseSnackbar } from '../../common/helpers/hooks/useApiResponseSnackbar';
import { CAMPAIGNS_QUERY_KEY } from '../../common/constants/queryClientKeys';
import { useQueryClient } from '@tanstack/react-query';
import { UseArchiveCampaigns } from '../api/hooks/useArchiveCampaigns';

export const CampaignListContainer: FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigateWithBasepath = useNavigateWithBasepath();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar, handleErrorResponse } = useApiResponseSnackbar();
  const { mutate: changeStatus, isLoading: statusChangeLoading } = useChangeStatusCampaigns();
  const { mutate: archiveCampaigns, isLoading: archiveLoading } = UseArchiveCampaigns();

  const [archiveCampaignId, setArchiveCampaignId] = useState<number | null>(null);
  const [changeStatusData, setChangeStatusData] = useState<{
    campaignId: number;
    status: boolean;
  } | null>(null);

  const { siteId: paramSiteId } = useParams();
  const siteId = +paramSiteId!;

  const queryParams = useMemo<CampaignQueryModel>(() => {
    return collectQueryParamsCampaigns(searchParams);
  }, [searchParams]);

  const {
    data: campaigns = [],
    isError,
    isFetching,
  } = useGetCampaigns<CampaignRowModel[]>(queryParams, data => {
    return data.map(item => ({
      ...item,
      endDate: dayjs(item.endDate).format(DATE_FORMAT_MASK),
      startDate: dayjs(item.startDate).format(DATE_FORMAT_MASK),
      updatedAt: dayjs(item.updatedAt).format(DATE_FORMAT_MASK),
    }));
  });

  const handleChangeStatus = () => {
    if (changeStatusData) {
      changeStatus(changeStatusData, {
        onSuccess: () => {
          enqueueSnackbar(
            <Trans
              i18nKey="success_update_message"
              values={{ entity: t('campaign') }}
              components={{ bold: <strong /> }}
            />,
            { variant: 'success' }
          );
          queryClient.invalidateQueries([CAMPAIGNS_QUERY_KEY]);
        },
        onError: handleErrorResponse,
      });
    }
  };

  const handleArchive = () => {
    if (archiveCampaignId) {
      archiveCampaigns(archiveCampaignId, {
        onSuccess: () => {
          enqueueSnackbar(
            <Trans
              i18nKey="success_archive_message"
              values={{ entity: t('campaign') }}
              components={{ bold: <strong /> }}
            />,
            { variant: 'success' }
          );
          queryClient.invalidateQueries([CAMPAIGNS_QUERY_KEY]);
        },
        onError: handleErrorResponse,
      });
    }
  };

  return (
    <Fragment>
      <CampaignList
        isError={isError}
        loading={isFetching}
        campaigns={campaigns}
        onClickDelete={campaignId => setArchiveCampaignId(campaignId)}
        onClickCreate={() => navigateWithBasepath(getCampaignCreateRoute(siteId))}
        onClickEdit={campaignId => navigateWithBasepath(getCampaignEditRoute(siteId, campaignId))}
        onClickDetails={campaignId =>
          navigateWithBasepath(getCampaignEditRoute(siteId, campaignId))
        }
        onClickChangeStatus={data => setChangeStatusData(data)}
      />
      {!!archiveCampaignId && (
        <Confirm
          loading={archiveLoading}
          title={t('archive_campaign')}
          onClose={() => setArchiveCampaignId(null)}
          onConfirm={handleArchive}
        >
          <Trans
            i18nKey="are_you_sure_archive"
            values={{ entity: t('campaign') }}
            components={{ bold: <strong /> }}
          />
        </Confirm>
      )}
      {changeStatusData && (
        <Confirm
          title={t('status_change')}
          loading={statusChangeLoading}
          onClose={() => setChangeStatusData(null)}
          onConfirm={handleChangeStatus}
        >
          <Trans
            i18nKey="change_status_text"
            values={{ status: t('campaign') }}
            components={{ bold: <strong /> }}
          />
        </Confirm>
      )}
    </Fragment>
  );
};
