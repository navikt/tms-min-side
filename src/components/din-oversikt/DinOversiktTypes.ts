import { Microfrontend } from "../../microfrontends/microfrontendTypes";

export interface PersonalizedContent {
    microfrontends: Microfrontend[];
    produktkort: string[];
    dokumenter: Dokument[];
    meldekort: boolean;
    aktuelt: Microfrontend[];
    offerStepup: boolean;
}

export interface Dokument {
    navn: string;
    kode: string;
    sistEndret: string;
    url: string;
}