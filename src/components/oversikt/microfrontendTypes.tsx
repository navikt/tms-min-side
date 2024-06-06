export interface Microfrontend {
  microfrontend_id: string;
  url: string;
}

export interface PersonalizedContent {
  microfrontends: Microfrontend[];
  produktkort: string[];
  oppfolgingContent: boolean;
  meldekort: boolean;
  aktuelt: Microfrontend[];
  offerStepup: boolean;
}
