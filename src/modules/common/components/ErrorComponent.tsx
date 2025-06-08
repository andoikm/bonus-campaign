import { Stack, Typography } from '@mui/material';
import { useTranslation } from '@softland/admin-internationalization';
import { FC } from 'react';

export const ErrorComponent: FC = () => {
  const { t } = useTranslation();
  return (
    <Stack height="100%" justifyContent="center" alignItems="center">
      <Typography variant="caption" color="error.main">
        {t('error_unknown')}
      </Typography>
    </Stack>
  );
};
