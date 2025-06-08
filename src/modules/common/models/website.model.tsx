export interface WebsiteModel {
  [key: string]: any;

  id: number;
  domain: string;
  commission: number | null;
  targetCountries: string[];
  supportedCurrencies: string[];
  supportedLanguages: string[];
  defaultCurrency: string;
  defaultLanguage: string;
}
