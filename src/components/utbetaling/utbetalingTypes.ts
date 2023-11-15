export interface SisteUtbetaling {
  utbetaling: number;
  dato: string;
  ytelse: string,
  kontonummer: string;
  id: string;
}

export interface Kommende {
  utbetaling: number;
  dato: string;
  ytelse: string;
  kontonummer: string;
  id: string;
}

export interface UtbetalingResponse {
  hasUtbetaling: string;
  hasKommende: boolean;
  sisteUtbetaling: SisteUtbetaling | null;
  kommende: Kommende | null;
}


