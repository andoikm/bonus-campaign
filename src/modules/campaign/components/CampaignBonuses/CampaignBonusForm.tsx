import { FC, useState } from 'react';
import { Controller, useForm } from '@softland/forms';
import { useTranslation } from '@softland/admin-internationalization';
import { TemplateModel } from '../../models/templates-api.model';
import { useWebsite } from '../../../common/context/WebSiteProvider';
import { LayoutHeader } from '../../../common/components/layouts/LayoutHeader';
import { LanguagesTab, TabModeEnum } from '../../../common/components/Lnaguages/LanguagesTab';
import { TextFieldLengthIndicator } from '../../../common/components/TextFieldLengthIndicator';
import { BigInfo } from '../../../common/components/BigInfo';
import { NumericInput } from '@softland/design-system';

import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { PropertyFieldTypeEnum } from '../../models/bonus-field.model';
import { DateTimePicker, LocalizationProvider } from '@softland/x-premium/date-pickers-pro';
import { dateTimePickerProps } from '../../../common/constants/dateTimePickerProps';
import { AdapterDayjs } from '@softland/x-premium/date-pickers-pro/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface CampaignBonusFormProps {
  template: TemplateModel;
  loading?: boolean;
}

interface TemplateBlockValues {
  [paramKey: string]: number | string | boolean | Dayjs | null;
}

interface FakeModel {
  names: Record<string, string>;
  descriptions: Record<string, string>;
  expirationAfterClaim: number;
  templateBlocks: Record<string, TemplateBlockValues>;
}

export const CampaignBonusForm: FC<CampaignBonusFormProps> = ({ template, loading }) => {
  const { t } = useTranslation();
  const website = useWebsite();
  const [selectedLanguage, setSelectedLanguage] = useState(website.defaultLanguage);
  const [existingLanguages, setExistingLanguages] = useState<string[]>([
    website.defaultLanguage,
    'en',
  ]);

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FakeModel>({
    mode: 'onChange',
    defaultValues: {
      names: { [website.defaultLanguage]: '' },
      descriptions: { [website.defaultLanguage]: '' },
    },
  });

  const title = watch(`names.${selectedLanguage}`);
  const description = watch(`descriptions.${selectedLanguage}`);

  const handleAddLanguage = (language: string) => {
    setValue(`names.${language}`, '');
    setValue(`descriptions.${language}`, '');
    setExistingLanguages(prev => [...prev, language]);
  };

  const handleLanguageDelete = (language: string) => {
    setExistingLanguages(prev => prev.filter(lang => lang !== language));
  };

  const onSubmit = (data: FakeModel) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const renderLangField = (
    name: 'names' | 'descriptions',
    label: string,
    maxLength: number,
    multiline = false
  ) => (
    <Box>
      <Controller
        key={`${name}.${selectedLanguage}`}
        control={control}
        name={`${name}.${selectedLanguage}`}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            value={field.value ?? ''}
            fullWidth
            error={!!error}
            helperText={error?.message}
            label={`${label}*`}
            size="small"
            multiline={multiline}
            minRows={multiline ? 2 : undefined}
            inputProps={{ maxLength }}
          />
        )}
      />
      <TextFieldLengthIndicator
        value={(name === 'names' ? title?.length : description?.length) || 0}
        max={maxLength}
      />
    </Box>
  );

  const renderBlockParams = () =>
    template.templateBlocks.map(templateBlock => (
      <Box key={templateBlock.blockId}>
        <Typography variant="subtitle2">{templateBlock.templateBlockName}</Typography>
        <Stack direction="row" gap={2} mt={2}>
          {templateBlock.params.map(param => {
            const {
              blockParamKey,
              blockParamIsOptional,
              blockParamTranslationKey,
              blockParamType,
            } = param;

            const uniqueKey = `${templateBlock.blockId}.${blockParamKey}`;
            const inputName =
              `templateBlocks.${templateBlock.blockId}.${blockParamKey}` as keyof FakeModel;
            const validationRoles = blockParamIsOptional
              ? {}
              : { required: t('field_is_required') };

            switch (blockParamType) {
              case PropertyFieldTypeEnum.INTEGER:
                return (
                  <Controller
                    key={uniqueKey}
                    control={control}
                    name={inputName}
                    rules={{ ...validationRoles }}
                    render={({ field: { ref, value, ...restField }, fieldState: { error } }) => (
                      <NumericInput
                        {...restField}
                        value={value || ''}
                        fullWidth
                        integer
                        error={!!error}
                        helperText={error?.message}
                        label={t(blockParamTranslationKey)}
                        size="small"
                      />
                    )}
                  />
                );
              case PropertyFieldTypeEnum.DECIMAL:
              case PropertyFieldTypeEnum.MONEY:
                return (
                  <Controller
                    key={uniqueKey}
                    control={control}
                    name={inputName}
                    rules={{ ...validationRoles }}
                    render={({ field: { ref, value, ...restField }, fieldState: { error } }) => (
                      <NumericInput
                        {...restField}
                        value={value || ''}
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        label={t(blockParamTranslationKey)}
                        size="small"
                      />
                    )}
                  />
                );
              case PropertyFieldTypeEnum.STRING:
                return (
                  <Controller
                    key={uniqueKey}
                    name={inputName}
                    control={control}
                    rules={{ ...validationRoles }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ''}
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        label={`${t(blockParamTranslationKey)}${blockParamIsOptional ? '' : '*'}`}
                        size="small"
                      />
                    )}
                  />
                );
              case PropertyFieldTypeEnum.BOOLEAN:
                return (
                  <Controller
                    key={uniqueKey}
                    name={inputName}
                    control={control}
                    rules={{ ...validationRoles }}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            {...field}
                            checked={!!field.value}
                            onChange={e => field.onChange(e.target.checked)}
                          />
                        }
                        label={`${t(blockParamTranslationKey)}${blockParamIsOptional ? '' : '*'}`}
                      />
                    )}
                  />
                );

              case PropertyFieldTypeEnum.PROVIDER_GAME_TYPE_GAME_SELECT:
                return (
                  <Button key={uniqueKey} variant="outlined" fullWidth sx={{ borderRadius: '6px' }}>
                    {t('select_games')}
                  </Button>
                );

              case PropertyFieldTypeEnum.DATE_TIME:
                return (
                  <LocalizationProvider dateAdapter={AdapterDayjs} key={uniqueKey}>
                    <Box width="100%">
                      <Controller
                        control={control}
                        name={inputName}
                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                          <DateTimePicker
                            value={dayjs.isDayjs(value) ? value : null}
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
                            sx={{ width: '100%' }}
                          />
                        )}
                      />
                    </Box>
                  </LocalizationProvider>
                );

              default:
                return <div>{blockParamType}</div>;
            }
          })}
        </Stack>
      </Box>
    ));

  return (
    <Stack px={2} py={2} spacing={2}>
      <Box>
        <LayoutHeader title={t('general_details')} />
        <LanguagesTab
          mode={TabModeEnum.EDIT}
          errors={[...Object.keys(errors?.names ?? {}), ...Object.keys(errors?.descriptions ?? {})]}
          existingLanguages={existingLanguages}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          onAddLanguage={handleAddLanguage}
          onDeleteLanguage={handleLanguageDelete}
        />
      </Box>

      <Stack spacing={2}>
        <BigInfo>
          The main language will be used as the default when other languages are not provided.
        </BigInfo>

        {renderLangField('names', t('title'), 16)}
        {renderLangField('descriptions', t('descriptions'), 256, true)}

        <Stack maxWidth={275}>
          <Typography variant="caption">{t('expiration_after_assignment')}*</Typography>
          <Controller
            control={control}
            name="expirationAfterClaim"
            render={({ field: { ref, value, ...restField }, fieldState: { error } }) => (
              <NumericInput
                {...restField}
                value={value || ''}
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
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <LayoutHeader title={t('blocks_configuration')} />
        {renderBlockParams()}
      </Stack>

      <Stack direction="row" justifyContent="flex-end" mt={4} spacing={2}>
        <Button variant="text">{t('cancel')}</Button>
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
          startIcon={loading ? <CircularProgress size={18} /> : false}
        >
          {t('save')}
        </Button>
      </Stack>
    </Stack>
  );
};
