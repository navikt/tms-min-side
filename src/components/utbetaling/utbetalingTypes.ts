export interface SisteUtbetaling {
  hasUtbetaling: string;
  utbetaling: number;
  dato: string;
  ytelse: string,
  kontonummer: string;
  id: string;
}

export interface Kommende {
  hasKommende: boolean;
  utbetaling: number;
  dato: string;
  ytelse: string;
  kontonummer: string;
  id: string;
}

export interface UtbetalingResponse {
  sisteUtbetaling: SisteUtbetaling;
  kommende: Kommende;
}


