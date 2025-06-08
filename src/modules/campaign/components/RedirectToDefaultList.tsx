import { Navigate } from 'react-router-dom';
import { useGetWebsites } from 'modules/common/api/hooks/useGetWebsites';
import { ErrorComponent } from 'modules/common/components/ErrorComponent';
import { CircularProgress, Stack } from '@mui/material';
import { WebsiteModel } from '../../common/models/website.model';

export const RedirectToDefaultList = () => {
  const { data = [], isError, isFetching } = useGetWebsites<WebsiteModel[]>();

  if (isFetching) {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center">
        <CircularProgress size="40px" />
      </Stack>
    );
  }
  if (isError) {
    return <ErrorComponent />;
  }

  return <Navigate to={`${data[0].id}`} replace />;
};
