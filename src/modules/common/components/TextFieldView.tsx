import { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface TextFieldViewProps {
  label: string;
  value: number | string;
}

export const TextFieldView: FC<TextFieldViewProps> = ({ label, value }) => {
  return (
    <Box mt={1}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" color="text.primary" mb={0.5}>
        {value}
      </Typography>
    </Box>
  );
};
