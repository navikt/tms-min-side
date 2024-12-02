export interface Dokumenter {
  dokumentInfoId: string;
  tittel: string;
  filtype: string;
  filstorrelse: number;
  brukerHarTilgang: boolean;
}

export interface DokumentType {
  tittel: string,
  opprettet: string,
  dokumentInfoId: string,
  journalpostId: string,
  temakode: string,
  avsender: string | null,
  mottaker: string | null
}