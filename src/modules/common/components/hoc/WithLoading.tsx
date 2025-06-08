import { FC, PropsWithChildren } from 'react';
import { Box, BoxProps, CircularProgress } from '@mui/material';

interface WithLoadingProps extends BoxProps {
  loading: boolean;
  size?: number;
}

export const WithLoading: FC<PropsWithChildren<WithLoadingProps>> = ({
  loading,
  size = 40,
  children,
  ...boxProps
}) => {
  return (
    <Box position="relative" minHeight={size} {...boxProps}>
      {loading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor="rgba(255, 255, 255, 0.7)"
          zIndex={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={size} />
        </Box>
      )}
      {children}
    </Box>
  );
};
