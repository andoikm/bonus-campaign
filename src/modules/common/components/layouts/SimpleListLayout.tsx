import { Box, Stack, Typography } from '@mui/material';
import { FC, PropsWithChildren, ReactElement } from 'react';

interface SimpleListLayoutProps {
  title: string;
  headerExtraComponent?: ReactElement;
}

export const SimpleListLayout: FC<PropsWithChildren<SimpleListLayoutProps>> = ({
  title,
  headerExtraComponent,
  children,
}) => {
  return (
    <Stack height="100%">
      <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{title}</Typography>
          {headerExtraComponent}
        </Stack>
      </Stack>

      <Box flex={1} pb={2} overflow="auto">
        {children}
      </Box>
    </Stack>
  );
};
