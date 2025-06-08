import { FC, PropsWithChildren } from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, StackProps } from '@mui/material';

type LayoutProps = StackProps;

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, ...rest }) => {
  const theme = useTheme();

  return (
    <Stack
      pt={1}
      pb={1}
      gap={2}
      width="100%"
      border={1}
      borderRadius={3}
      borderColor={theme.palette.divider}
      bgcolor="background.paper"
      {...rest}
    >
      {children}
    </Stack>
  );
};
