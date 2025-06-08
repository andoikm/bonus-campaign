import { FC, ReactElement } from 'react';
import { Box, BoxProps, Divider, Stack, Typography } from '@mui/material';

interface LayoutHeaderProps extends BoxProps {
  title: string;
  extraComponents?: ReactElement;
}

export const LayoutHeader: FC<LayoutHeaderProps> = ({ title, extraComponents, ...boxProps }) => {
  return (
    <Box {...boxProps}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight="500" mb={1}>
          {title}
        </Typography>
        {extraComponents}
      </Stack>
      <Divider />
    </Box>
  );
};
