import { CircularProgress, Stack } from '@mui/material';
import { FC } from 'react';

interface LoadingProps {
  size?: string;
}

export const Loading: FC<LoadingProps> = ({ size = '40px' }) => {
  return (
    <Stack height="100%" justifyContent="center" alignItems="center">
      <CircularProgress size={size} />
    </Stack>
  );
};
