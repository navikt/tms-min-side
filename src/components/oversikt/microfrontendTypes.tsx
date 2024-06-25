export interface Microfrontend {
  microfrontend_id: string;
  url: string;
}

export interface Dokument {
  navn: string;
  kode: string;
  sistEndret: string;
  url: string;
}

export interface PersonalizedContent {
  microfrontends: Microfrontend[];
  produktkort: string[];
  dokumenter: Dokument[];
  oppfolgingContent: boolean;
  meldekort: boolean;
  aktuelt: Microfrontend[];
  offerStepup: boolean;
}
