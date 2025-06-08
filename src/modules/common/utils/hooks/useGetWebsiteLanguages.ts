import { useMemo } from 'react';
import { useWebsite } from '../../context/WebSiteProvider';
import { useGetLanguages } from '../../api/hooks/useGetLanguages';

export const useGetWebsiteLanguages = () => {
  const website = useWebsite();
  const {
    data: languagesDictionary,
    isFetching: isLanguagesDictionaryFetching,
    isError: isLanguagesDictionaryError,
  } = useGetLanguages();

  const languages = useMemo(() => {
    if (languagesDictionary) {
      const lgMap = new Map(
        languagesDictionary.map(({ name, isoCode2Symbol }) => [
          isoCode2Symbol,
          { key: isoCode2Symbol, name },
        ])
      );

      return {
        supportedLanguages: website.supportedLanguages.map(lg => lgMap.get(lg)!),
        defaultLanguage: lgMap.get(website.defaultLanguage)!,
      };
    }
  }, [languagesDictionary, website]);

  return {
    isFetching: isLanguagesDictionaryFetching,
    isError: isLanguagesDictionaryError,
    data: languages,
  };
};
