import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import Stack from '@mui/material/Stack';

import { SearchInput } from '@softland/design-system';
import { Button } from '@mui/material';
import { useTranslation } from '@softland/admin-internationalization';
import { QUERY } from '../../common/constants/filterKeys';

interface CampaignFilterProps {
  onClickCreate: () => void;
}

export const CampaignFilter: FC<CampaignFilterProps> = ({ onClickCreate }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const searchValue = searchParams.get(QUERY) ?? '';

  const updateSearchValue = (newValue: string) => {
    const val = newValue.trim();
    if (!val) {
      searchParams.delete(QUERY);
    } else {
      searchParams.set(QUERY, val);
    }
    setSearchParams(searchParams);
  };

  return (
    <Box bgcolor="background.paper">
      <Stack justifyContent="space-between" direction="row" spacing={1} p={1}>
        <Stack direction="row" alignItems="center">
          <SearchInput value={searchValue} onChange={updateSearchValue} />
        </Stack>
        <Stack>
          <Button
            size="medium"
            variant="contained"
            onClick={onClickCreate}
            startIcon={<AddOutlinedIcon />}
          >
            {t('create_campaign')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
