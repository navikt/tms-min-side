export interface Tekstinnhold {
  tittel: string;
  beskrivelse: string;
  link: string;
}

export interface StatuskortType {
  id: string;
  tjeneste: string;
  innhold: Tekstinnhold;
}

export interface StatuskortResponse {
  statuskort: StatuskortType[];
  harSkjulteKort: boolean;
}
