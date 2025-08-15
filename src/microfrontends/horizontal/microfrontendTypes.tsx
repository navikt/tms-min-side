export interface Microfrontend {
  microfrontend_id: string;
  url: string;
  appname: string;
  namespace: string;
  fallback: string;
  ssr: boolean;
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
  meldekort: boolean;
  aktuelt: Microfrontend[];
  offerStepup: boolean;
}
