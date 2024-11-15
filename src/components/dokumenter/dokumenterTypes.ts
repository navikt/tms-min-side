export interface Journalpost {
  journalpostId: string;
  temakode: string,
  temanavn: string,
  tittel: string;
  avsender: string;
  mottaker: string;
  journalposttype: string,
  opprettet: string;
  dokument: Dokumenter;
  vedlegg: Dokumenter[];
}

export interface Dokumenter {
  dokumentInfoId: string;
  tittel: string;
  filtype: string;
  filstorrelse: number;
  brukerHarTilgang: boolean;
}