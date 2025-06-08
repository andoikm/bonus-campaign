import { languageClient } from './http-client';
import { LanguageModel } from '../models/language.model';

export const languageApi = {
  getLanguages() {
    return languageClient.get<LanguageModel[]>('/languages');
  },
};
