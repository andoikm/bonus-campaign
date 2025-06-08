import { FC, PropsWithChildren } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import InfoFilledIcon from '@mui/icons-material/Info';

export const BigInfo: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" gap={0.5}>
      <InfoFilledIcon sx={{ color: theme.palette.action.active }} fontSize="small" />
      <Typography variant="body2" color={theme.palette.text.secondary}>
        {children}
      </Typography>
    </Stack>
  );
};
