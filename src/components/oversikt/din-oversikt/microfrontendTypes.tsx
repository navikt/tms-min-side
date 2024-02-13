export interface EnabledMicrofrontend {
  microfrontend_id: string;
  url: string;
}

export interface EnabledMicrofrontends {
  microfrontends: EnabledMicrofrontend[];
  offerStepup: boolean;
}
