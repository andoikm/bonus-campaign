import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { AxiosError } from 'axios';

export interface ErrorResponse {
  errors?: Record<string, string[]>;
}

export const useApiResponseSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleErrorResponse = useCallback(
    (error: AxiosError<ErrorResponse>) => {
      let hasDisplayedError = false;

      const responseErrors = error?.response?.data?.errors;

      if (responseErrors) {
        Object.keys(responseErrors).forEach(key => {
          const messages = responseErrors[key];
          if (Array.isArray(messages)) {
            enqueueSnackbar(messages.join(', '), { variant: 'error' });
            hasDisplayedError = true;
          }
        });
      }

      if (!hasDisplayedError) {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  return { handleErrorResponse, enqueueSnackbar };
};
