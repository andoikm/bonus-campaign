import { FC, Fragment, SyntheticEvent } from 'react';
import { useGetWebsites } from '../api/hooks/useGetWebsites';
import { Autocomplete, Chip, CircularProgress, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { WebsiteModel } from '../models/website.model';

interface WebsitesSelectProps {
  onChange: (siteId: number) => void;
}

export const WebsitesSelect: FC<WebsitesSelectProps> = ({ onChange }) => {
  const theme = useTheme();
  const { siteId } = useParams();
  const { data = [], isSuccess, isFetching } = useGetWebsites<WebsiteModel[]>();

  const handleChange = (e: SyntheticEvent, site: WebsiteModel) => {
    if (!site) {
      return;
    }

    onChange(site.id);
  };

  return (
    <Fragment>
      {isSuccess && data.length === 1 && <Chip label={data[0].domain} variant="outlined" />}
      {isSuccess && data.length > 1 && (
        <Autocomplete
          size="small"
          sx={{
            width: theme.spacing(31),
          }}
          clearIcon={null}
          blurOnSelect
          options={data}
          value={data.find(site => site.id === +siteId!) ?? null}
          fullWidth={false}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={option => option.domain}
          onChange={handleChange}
          renderInput={params => (
            <TextField
              {...params}
              size="small"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {isFetching ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              }}
            />
          )}
        />
      )}
    </Fragment>
  );
};
