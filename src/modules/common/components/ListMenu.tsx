import { IconButton, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import { ElementType, FC, Fragment, MouseEvent, SyntheticEvent, useState } from 'react';

export interface MenuItemModel {
  title: string;
  icon: ElementType;
  onClick: () => void;
  disabled?: boolean;
}

interface ListMenuProps {
  active?: boolean;
  anchorElement: ElementType;
  menuItems: MenuItemModel[];
}

export const ListMenu: FC<ListMenuProps> = ({
  active,
  menuItems,
  anchorElement: AnchorElement,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  return (
    <Fragment>
      <IconButton onClick={handleClick} sx={{ padding: 0 }}>
        <AnchorElement
          sx={{ color: active ? theme.palette.background.paper : theme.palette.action.active }}
        />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {menuItems.map(item => {
          return (
            <MenuItem
              key={item.title}
              onClick={(e: SyntheticEvent) => {
                e.stopPropagation();
                item.onClick();
                setAnchorEl(null);
              }}
              disabled={item.disabled}
              sx={{ paddingY: 0 }}
            >
              <Stack direction="row" alignItems="center" width="100%">
                <IconButton>
                  <item.icon />
                </IconButton>
                <Typography variant="body1">{item.title}</Typography>
              </Stack>
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
};
