interface NesteMeldekortFraApi {
  uke: string;
  kanSendesFra: string;
  fra: string;
  til: string;
}

export interface MeldekortDataFraApi {
  meldekort: number;
  etterregistrerteMeldekort: number;
  antallGjenstaaendeFeriedager: number;
  nesteMeldekort: NesteMeldekortFraApi | null;
  nesteInnsendingAvMeldekort: string | null;
}

export const isMeldekortbruker = (meldekort: MeldekortDataFraApi | undefined) => {
  if (!meldekort) {
    return null;
  }

  return (
    meldekort.nesteMeldekort != null ||
    meldekort.nesteInnsendingAvMeldekort != null ||
    meldekort.antallGjenstaaendeFeriedager > 0 ||
    meldekort.etterregistrerteMeldekort > 0 ||
    meldekort.meldekort > 0
  );
};
