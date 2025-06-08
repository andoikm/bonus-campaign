import { FC, useState } from 'react';
import { LayoutHeader } from '../../../common/components/layouts/LayoutHeader';
import { useTranslation } from '@softland/admin-internationalization';
import { Layout } from '../../../common/components/layouts/Layout';
import { BigInfo } from '../../../common/components/BigInfo';
import { yupResolver } from '@softland/forms/resolver';
import { LanguagesTab, TabModeEnum } from '../../../common/components/Lnaguages/LanguagesTab';
import { useWebsite } from '../../../common/context/WebSiteProvider';
import { Controller, useForm } from '@softland/forms';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@softland/x-premium/date-pickers-pro';
import { AdapterDayjs } from '@softland/x-premium/date-pickers-pro/AdapterDayjs';
import { NumericInput } from '@softland/design-system';
import { getCampaignDetailsSchema } from '../../utils/camping-details-validation.schema';
import { CampaignDetailsModel } from '../../models/campaign.model';
import { useApiResponseSnackbar } from '../../../common/helpers/hooks/useApiResponseSnackbar';
import { WithLoading } from '../../../common/components/hoc/WithLoading';
import { TextFieldLengthIndicator } from '../../../common/components/TextFieldLengthIndicator';
import { useParams } from 'react-router-dom';
import { useEditCampaignsDetails } from '../../api/hooks/useEditCampaignsDetails';
import { dateTimePickerProps } from '../../../common/constants/dateTimePickerProps';
import { GET_CAMPAIGN_QUERY_KEY } from '../../../common/constants/queryClientKeys';
import { useQueryClient } from '@tanstack/react-query';

export interface CampaignDetailsEditProps {
  defaultValues: CampaignDetailsModel;
  onCancel: () => void;
  onSuccessCallback: () => void;
}

export const CampaignDetailsEdit: FC<CampaignDetailsEditProps> = ({
  defaultValues,
  onSuccessCallback,
  onCancel,
}) => {
  const { t } = useTranslation();
  const website = useWebsite();
  const queryClient = useQueryClient();
  const { siteId, campaignId } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState(website.defaultLanguage);
  const initialExistingLanguages = Object.keys(defaultValues.titleTranslations || {});
  const [existingLanguages, setExistingLanguages] = useState<string[]>(initialExistingLanguages);

  const { handleErrorResponse, enqueueSnackbar } = useApiResponseSnackbar();
  const { mutate: editCampaignsDetails, isLoading } = useEditCampaignsDetails(+campaignId!);

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CampaignDetailsModel>({
    mode: 'onChange',
    resolver: yupResolver(getCampaignDetailsSchema(t, website.defaultLanguage)),
    defaultValues,
  });

  const handleAddLanguage = (language: string) => {
    setExistingLanguages(prev => {
      setValue(`titleTranslations.${language}`, '');
      return [...prev, language];
    });
  };

  const onSubmit = (data: CampaignDetailsModel) => {
    editCampaignsDetails(
      { ...data, siteId: +siteId!, systemName: data.titleTranslations[website.defaultLanguage] },
      {
        onSuccess: () => {
          enqueueSnackbar(t('success_update_message', { entity: t('campaign_details') }), {
            variant: 'success',
          });
          queryClient.invalidateQueries([GET_CAMPAIGN_QUERY_KEY]);
          onSuccessCallback();
        },
        onError: handleErrorResponse,
      }
    );
  };

  const titleTextValue = watch(`titleTranslations.${selectedLanguage}`);
  return (
    <Layout px={2} gap={0}>
      <LayoutHeader title={t('campaign_details')} />
      <WithLoading loading={isLoading}>
        <Stack gap={2}>
          <LanguagesTab
            mode={TabModeEnum.EDIT}
            onDeleteLanguage={language =>
              setExistingLanguages(prev => prev.filter(lang => lang !== language))
            }
            errors={Object.keys(errors?.titleTranslations ?? {})}
            existingLanguages={existingLanguages}
            onSelectLanguage={setSelectedLanguage}
            selectedLanguage={selectedLanguage}
            onAddLanguage={handleAddLanguage}
          />
          <BigInfo>
            The primary language will serve as the default when no other languages are selected.
          </BigInfo>

          <Box>
            <Controller
              key={selectedLanguage}
              control={control}
              name={`titleTranslations.${selectedLanguage}`}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  value={field.value ?? ''}
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  label={`${t('campaign_title')}*`}
                  size="small"
                  inputProps={{ maxLength: 16 }}
                />
              )}
            />
            <TextFieldLengthIndicator value={titleTextValue?.length || 0} max={16} />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="caption">{t('expiration_after_assignment')}* </Typography>
              <Controller
                control={control}
                name="expirationToClaimInDays"
                render={({ field: { ref, value, ...restField }, fieldState: { error } }) => (
                  <NumericInput
                    {...restField}
                    value={value || ''}
                    fullWidth
                    integer
                    error={!!error}
                    helperText={error?.message}
                    placeholder={t('duration')}
                    size="small"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">{t('days')}</InputAdornment>,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="caption">{t('configuration_currency')}* </Typography>
              <Controller
                control={control}
                name="configurationCurrency"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Autocomplete
                    options={website.supportedCurrencies}
                    value={value}
                    isOptionEqualToValue={(_, val) => val === value}
                    onChange={(_, newValue) => onChange(newValue)}
                    size="small"
                    clearIcon={null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        placeholder={t('currency')}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="caption">{t('supported_currencies')}* </Typography>
              <Controller
                control={control}
                name="supportedCurrencies"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Autocomplete
                    options={website.supportedCurrencies}
                    value={value ?? null}
                    onChange={(_, newValue) => onChange(newValue)}
                    size="small"
                    clearIcon={null}
                    multiple
                    renderInput={params => (
                      <TextField
                        {...params}
                        placeholder={t('currencies')}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="caption">{t('total_player_count')}* </Typography>
              <Controller
                control={control}
                name="maxAssigneeCount"
                render={({ field: { ref, value, ...restField }, fieldState: { error } }) => (
                  <NumericInput
                    {...restField}
                    value={value || ''}
                    fullWidth
                    integer
                    error={!!error}
                    helperText={error?.message}
                    placeholder={t('count')}
                    size="small"
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={6}>
              <Typography variant="caption">{t('duration')}* </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" spacing={1}>
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                      <DateTimePicker
                        value={value ?? null}
                        onChange={v => {
                          onChange(v);
                          onBlur();
                        }}
                        slotProps={{
                          textField: {
                            size: 'small',
                            error: !!error,
                            helperText: error?.message,
                            placeholder: t('start'),
                          },
                          popper: dateTimePickerProps.slotProps.popper,
                        }}
                        {...dateTimePickerProps.rest}
                      />
                    )}
                  />
                  <Typography sx={{ alignSelf: 'center' }}>-</Typography>
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                      <DateTimePicker
                        value={value ?? null}
                        onChange={v => {
                          onChange(v);
                          onBlur();
                        }}
                        slotProps={{
                          textField: {
                            size: 'small',
                            error: !!error,
                            helperText: error?.message,
                            placeholder: t('end'),
                          },
                          popper: dateTimePickerProps.slotProps.popper,
                        }}
                        {...dateTimePickerProps.rest}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="flex-end" mt={4} spacing={2}>
            <Button variant="text" onClick={onCancel}>
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
              startIcon={isLoading ? <CircularProgress size={18} /> : null}
            >
              {t('save')}
            </Button>
          </Stack>
        </Stack>
      </WithLoading>
    </Layout>
  );
};
