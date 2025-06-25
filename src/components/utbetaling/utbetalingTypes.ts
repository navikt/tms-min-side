export type UtbetalingData = {
  utbetaling: number;
  dato: string;
  ytelse: string;
  kontonummer: string;
  id: string;
};

export type Utbetaling = {
  sisteUtbetaling: UtbetalingData | null;
  kommende: UtbetalingData | null;
};
