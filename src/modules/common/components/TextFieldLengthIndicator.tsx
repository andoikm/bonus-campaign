import { FC } from 'react';
import { Stack, Typography } from '@mui/material';

interface TextFieldLengthIndicatorProps {
  value: number;
  max: number;
}

export const TextFieldLengthIndicator: FC<TextFieldLengthIndicatorProps> = ({ value, max }) => {
  return (
    <Stack alignItems="flex-end" mt={0.5}>
      <Typography variant="caption" color={value > max ? 'error' : undefined}>
        {value}/{max}
      </Typography>
    </Stack>
  );
};
