import { useQuery } from '@tanstack/react-query';
import { languageApi } from '../language.api';
import { LanguageModel } from '../../models/language.model';
import { GET_LANGUAGES_QUERY_KEY } from '../../constants/queryClientKeys';

export const useGetLanguages = <T = LanguageModel[]>(select?: (data: LanguageModel[]) => T) => {
  return useQuery({
    queryKey: [GET_LANGUAGES_QUERY_KEY],
    queryFn: async () => {
      const { data } = await languageApi.getLanguages();
      return data;
    },
    select,
  });
};
