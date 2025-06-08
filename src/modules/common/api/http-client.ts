import axios from 'axios';
import { stringify } from 'qs';

const url = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL ?? '' : '/';

const websitesURL = `${url}api/partner/api/v1.0/sites`;

const campaignURl = `${url}api/bonusenginev2/api/v1/Campaign`;

const languageURL = `${url}api/dictionary/api/v1.0`;

const templatesUrl = `${url}api/bonusenginev2/api/v1/Template`;

export const websitesClient = axios.create({
  baseURL: websitesURL,
  paramsSerializer: {
    serialize: params => {
      return stringify(params, { skipNulls: true });
    },
  },
});

export const campaignClient = axios.create({
  baseURL: campaignURl,
  paramsSerializer: {
    serialize: params => {
      return stringify(params, { skipNulls: true });
    },
  },
});

export const templatesClient = axios.create({
  baseURL: templatesUrl,
  paramsSerializer: {
    serialize: params => {
      return stringify(params, { skipNulls: true });
    },
  },
});

export const languageClient = axios.create({
  baseURL: languageURL,
});
