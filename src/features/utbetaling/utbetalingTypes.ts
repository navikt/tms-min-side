export type UtbetalingData = {
  utbetaling: number;
  dato: string;
  ytelse: string;
  kontonummer: string;
  id: string;
};

export type Utbetaling = {
  sisteUtbetalinger: UtbetalingData[];
  kommendeUtbetalinger: UtbetalingData[];
};
