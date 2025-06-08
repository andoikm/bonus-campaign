import React, { FC, KeyboardEvent, PropsWithChildren } from 'react';
import { Stack, StackProps, styled } from '@mui/material';

type BorderStyle =
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset';

interface StyledStackProps {
  color: string;
  hasError: boolean;
  selected: boolean;
  clickable: boolean;
  borderStyle: BorderStyle;
}

const StyledStack = styled(Stack, {
  shouldForwardProp: prop =>
    !['color', 'hasError', 'selected', 'clickable', 'borderStyle'].includes(prop as string),
})<StyledStackProps>(({ theme, color, hasError, selected, clickable, borderStyle }) => {
  const computedColor = hasError
    ? theme.palette.error.main
    : selected
    ? theme.palette.primary.main
    : color;

  const borderColor = hasError
    ? theme.palette.error.main
    : selected
    ? theme.palette.primary.main
    : theme.palette.grey.A200;

  return {
    borderColor,
    borderStyle: selected ? 'solid' : borderStyle,
    borderWidth: 1,
    borderLeft: `6px solid ${computedColor}`,
    outline: 'none',
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    cursor: clickable ? 'pointer' : 'default',
    transition: 'box-shadow 250ms, border-color 250ms',
    ...(clickable && {
      '&:hover': {
        boxShadow: `0 0 2px ${theme.palette.primary.main},`,
        borderColor: theme.palette.primary.main,
      },
      '&:focus': { boxShadow: `0 0 2px ${theme.palette.primary.main}` },
    }),
  };
});

interface StackItemProps extends StackProps {
  color: string;
  hasError?: boolean;
  selected?: boolean;
  onClick?: () => void;
  borderStyle?: BorderStyle;
}

export const CardItem: FC<PropsWithChildren<StackItemProps>> = ({
  color,
  onClick,
  hasError = false,
  selected = false,
  borderStyle = 'dashed',
  children,
  ...restProps
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick?.();
    }
  };

  return (
    <StyledStack
      color={color}
      hasError={hasError}
      selected={selected}
      clickable={Boolean(onClick)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      borderStyle={borderStyle}
      tabIndex={onClick ? 0 : -1}
      {...restProps}
    >
      {children}
    </StyledStack>
  );
};
