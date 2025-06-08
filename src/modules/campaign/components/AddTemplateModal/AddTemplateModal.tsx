import { Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from '@softland/admin-internationalization';
import { EmptyModalFooter } from '../../../common/components/EmptyModalFooter';
import { WithLoading } from 'modules/common/components/hoc/WithLoading';
import { EmptyPlaceholder, Modal, SearchInput } from '@softland/design-system';
import { BigInfo } from 'modules/common/components/BigInfo';
import { CardItem } from 'modules/common/components/CardItem';
import { InfoOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useGetAvailableTemplates } from '../../api/hooks/useGetAvailableTemplates';
import { TemplateBaseApiModel, TemplateBaseModel } from '../../models/templates-api.model';

interface AddTemplateModalProps {
  onClose: () => void;
  onSelect: (payload: TemplateBaseModel) => void;
}

export const AddTemplateModal: FC<AddTemplateModalProps> = ({ onSelect, onClose }) => {
  const { siteId } = useParams();
  const theme = useTheme();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>('');

  const { data: templates = [], isFetching } = useGetAvailableTemplates<TemplateBaseModel[]>(
    +siteId!,
    (data: TemplateBaseApiModel[]) => {
      return data;
    }
  );

  const filteredTemplates = useMemo(() => {
    const searchValueLowerCase = searchValue.toLowerCase();

    return templates.filter(template => template.name.toLowerCase().includes(searchValueLowerCase));
  }, [searchValue, templates]);

  return (
    <Modal
      variant="medium"
      onClose={onClose}
      title={t('select_bonus_template')}
      footer={<EmptyModalFooter />}
    >
      <WithLoading loading={isFetching}>
        <Stack gap={2}>
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            debounceTimeout={300}
            sx={{ width: '100%', height: '36px' }}
          />
          <BigInfo>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut.
          </BigInfo>
          <Stack gap={2}>
            {filteredTemplates.map(template => (
              <CardItem
                key={template.id}
                borderStyle="solid"
                color={theme.palette.grey.A200}
                onClick={() => onSelect(template)}
              >
                <Stack flexDirection="row" alignItems="center" gap={1} px={2} py={2}>
                  <Typography variant="subtitle2">{template.name}</Typography>
                  <Tooltip arrow title={template.description}>
                    <InfoOutlined fontSize="small" color="action" />
                  </Tooltip>
                </Stack>
              </CardItem>
            ))}
            {filteredTemplates.length === 0 && !isFetching && (
              <EmptyPlaceholder placeholder={t('no_data', { entity: t('templates') })} />
            )}
          </Stack>
        </Stack>
      </WithLoading>
    </Modal>
  );
};
