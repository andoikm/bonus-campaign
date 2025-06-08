import { FC, useMemo } from 'react';
import { DataGridPremium, GridActionsCellItem, GridColDef } from '@softland/x-premium/grid-premium';
import { Stack, Switch } from '@mui/material';
import { Archive as ArchiveFilled, Edit as EditFilled, FindInPage } from '@mui/icons-material';
import { useTranslation } from '@softland/admin-internationalization';
import { CampaignFilter } from './CampaignFilter';
import { EmptyPlaceholder } from '@softland/design-system';
import { ErrorComponent } from '../../common/components/ErrorComponent';
import { CampaignRowModel } from '../models/campaign.model';
import { Link } from 'react-router-dom';

export interface CampaignListProps {
  isError: boolean;
  loading: boolean;
  onClickCreate: () => void;
  campaigns: CampaignRowModel[];
  onClickEdit: (campaignId: number) => void;
  onClickDelete: (campaignId: number) => void;
  onClickDetails: (campaignId: number) => void;
  onClickChangeStatus: (payload: { campaignId: number; status: boolean }) => void;
}

export const CampaignList: FC<CampaignListProps> = ({
  isError,
  loading,
  campaigns,
  onClickEdit,
  onClickCreate,
  onClickDelete,
  onClickDetails,
  onClickChangeStatus,
}) => {
  const { t } = useTranslation();
  const columns = useMemo<GridColDef[]>(() => {
    return [
      {
        field: 'id',
        headerName: t('campaign_id'),
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        renderCell: ({ row }) => {
          return (
            <Link
              to=""
              onClick={e => {
                e.preventDefault();
                onClickDetails(row.id);
              }}
            >
              {row.id}
            </Link>
          );
        },
      },
      {
        field: 'systemName',
        headerName: t('campaign_title'),
        headerAlign: 'left',
        align: 'left',
        flex: 1,
      },
      {
        field: 'configurationCurrency',
        headerName: t('currency'),
        headerAlign: 'left',
        align: 'left',
        flex: 1,
      },
      {
        field: 'duration',
        headerName: t('duration'),
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        renderCell: ({ row }) => {
          return `${row.startDate} - ${row.endDate}`;
        },
      },
      {
        field: 'updatedAt',
        headerName: t('last_modified_date'),
        headerAlign: 'left',
        align: 'left',
        flex: 1,
      },
      {
        field: 'status',
        headerName: t('status'),
        headerAlign: 'left',
        align: 'left',
        maxWidth: 100,
        flex: 1,
        renderCell: ({ row }) => {
          return (
            <Switch
              checked={row.status}
              onChange={(e, checked) =>
                onClickChangeStatus({ campaignId: row.id, status: checked })
              }
            />
          );
        },
      },
      {
        field: 'actions',
        type: 'actions',
        disableColumnMenu: false,
        getActions: ({ row }) => [
          <GridActionsCellItem
            label={t('details')}
            key="details"
            onClick={() => onClickDetails(row.id)}
            icon={<FindInPage fontSize="small" color="action" />}
          />,
          <GridActionsCellItem
            label={t('edit')}
            key="edit"
            showInMenu
            onClick={() => onClickEdit(row.id)}
            icon={<EditFilled fontSize="small" color="action" />}
          />,
          <GridActionsCellItem
            label={t('archive')}
            key="archive"
            showInMenu
            onClick={() => onClickDelete(row.id)}
            icon={<ArchiveFilled fontSize="small" color="action" />}
          />,
        ],
      },
    ];
  }, [t, onClickDetails, onClickChangeStatus, onClickEdit, onClickDelete]);

  return (
    <Stack height="100%" width="100%" borderRadius={0.5} bgcolor="background.paper">
      <CampaignFilter onClickCreate={onClickCreate} />
      <DataGridPremium
        slots={{
          noRowsOverlay: isError ? () => <ErrorComponent /> : () => <EmptyPlaceholder />,
        }}
        density="compact"
        disableRowGrouping
        rows={campaigns}
        columns={columns}
        loading={loading}
        hideFooter
      />
    </Stack>
  );
};
