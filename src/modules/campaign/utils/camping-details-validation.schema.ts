import * as yup from 'yup';
import { TFunction } from '@softland/admin-internationalization';

export const getCampaignDetailsSchema = (t: TFunction, defaultLanguage: string) =>
  yup.object({
    titleTranslations: yup.object().shape({
      [defaultLanguage]: yup.string().trim().required(t('field_is_required')),
    }),
    expirationToClaimInDays: yup.number().required(t('field_is_required')),
    configurationCurrency: yup.string().required(t('field_is_required')),
    supportedCurrencies: yup.array().of(yup.string()).min(1, t('field_is_required')),
    maxAssigneeCount: yup.number().required(t('field_is_required')),
    startDate: yup.date().required(t('field_is_required')).typeError(t('invalid_date')),
    endDate: yup
      .date()
      .required(t('field_is_required'))
      .typeError(t('invalid_date'))
      .min(yup.ref('startDate'), t('End_date_must_be_after_start_date')),
  });
