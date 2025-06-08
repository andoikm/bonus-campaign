import { Box, Stack, Tab, Typography } from '@mui/material';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { MoreVert as MoreVertFilled } from '@mui/icons-material';
import { ListMenu, MenuItemModel } from './ListMenu';
import { useTheme } from '@mui/material/styles';

export interface TabModel {
  id: number;
  title: string;
  menuItems?: MenuItemModel[];
}

interface TabsWithActionsProps {
  tabs: TabModel[];
  activeTab: number | null;
  onChange: (tab: TabModel['id']) => void;
  extraComponents?: ReactElement;
}

export const TabsWithActions: FC<TabsWithActionsProps> = ({
  tabs,
  activeTab,
  onChange,
  extraComponents,
}) => {
  const theme = useTheme();

  return (
    <Stack
      flexShrink={0}
      direction="row"
      alignItems="center"
      color="text.secondary"
      width="100%"
      sx={{ overflowX: 'auto' }}
      borderBottom={tabs.length ? `4px solid ${theme.palette.primary.dark}` : 'none'}
    >
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          sx={{ textTransform: 'none' }}
          component={Box}
          disabled={false}
          onChange={() => onChange(tab.id)}
          className={activeTab === tab.id ? 'Mui-selected' : ''}
          label={
            <Stack direction="row" alignItems="center" maxWidth="200px">
              <Typography variant="body2" noWrap>
                {tab.title}
              </Typography>
              {tab.menuItems?.length && (
                <ListMenu
                  active={tab.id === activeTab}
                  anchorElement={MoreVertFilled}
                  menuItems={tab.menuItems}
                />
              )}
            </Stack>
          }
        />
      ))}
      {extraComponents}
    </Stack>
  );
};

export const TabContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box flexGrow={1} overflow="auto" bgcolor="background.paper">
      {children}
    </Box>
  );
};
