export type UtbetalingData = {
  utbetaling: number;
  dato: string;
  ytelse: string;
  kontonummer: string;
  id: string;
};

export type Utbetaling = {
  hasUtbetaling: boolean;
  hasKommende: boolean;
  sisteUtbetaling: UtbetalingData | null;
  kommende: UtbetalingData | null;
};
