export interface Sakstemaer {
  kode: string;
}


export interface EnabledMicrofrontend {
  microfrontend_id: string;
  url: string;
}

export interface PersonalizedContent {
  microfrontends: EnabledMicrofrontend[];
  produktkort: string[];
  aiaStandard: true;
  oppfolgingContent: true;
  meldekort: true;
  offerStepup: boolean;
}
