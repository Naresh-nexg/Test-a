export enum Language {
  EN = 'en',
  TA = 'ta',
  TE = 'te',
  KN = 'kn',
  ML = 'ml',
}

export interface JobMatch {
  jobTitle: string;
  company: string;
  location: string;
  summary: string;
  matchPercentage: number;
}

export interface TranslationSet {
  app_title: string;
  app_subtitle: string;
  profile_placeholder: string;
  location_placeholder: string;
  analyze_button: string;
  analyzing: string;
  error_title: string;
  error_empty: string;
  error_generic: string;
  error_api_key: string;
  loader_text: string;
  match_results_title: string;
  summary_title: string;
}
