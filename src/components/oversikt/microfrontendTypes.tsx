export interface Microfrontend {
  microfrontend_id: string;
  url: string;
}

export interface PersonalizedContent {
  microfrontends: Microfrontend[];
  produktkort: string[];
  aiaStandard: boolean;
  aiaLegacy: boolean;
  brukNyAia: boolean;
  oppfolgingContent: boolean;
  meldekort: boolean;
  aktuelt: Microfrontend[];
  offerStepup: boolean;
}
