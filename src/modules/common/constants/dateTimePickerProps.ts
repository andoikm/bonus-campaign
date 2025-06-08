export const dateTimePickerProps = {
  rest: {
    disablePast: true,
    ampm: false,
    desktopModeMediaQuery: '@media (min-width: 0px)',
    sx: { flex: 1 },
  },
  slotProps: {
    popper: {
      modifiers: [
        { name: 'flip', options: { fallbackPlacements: ['top', 'bottom'] } },
        { name: 'preventOverflow', options: { altAxis: true, tether: true } },
      ],
    },
  },
};
