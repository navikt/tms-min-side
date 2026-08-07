export interface StatuskortType {
  id: string;
  tjeneste: string;
  tittel: string;
  beskrivelse: string;
  link: string;
}

export interface StatuskortResponse {
  statuskort: StatuskortType[];
  harSkjulteKort: boolean;
}
