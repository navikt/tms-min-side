export interface UnderYtelse {
  beskrivelse: string;
  satstype: string;
  sats: number;
  antall: number;
  belop: number;
}

export interface Trekk {
  trekk_type: string;
  trekk_belop: number;
}

export interface Rettighetshaver {
  aktoer_id: string;
  navn: string;
}

export interface Periode {
  fom: string;
  tom: string;
}

export interface HovedYtelse {
  ytelse: string;
  status: string;
  ytelse_dato: string;
  forfallsdato: string;
  ytelse_periode: Periode;
  utbetalt_til: string;
  kontonummer: string;
  underytelser: UnderYtelse[];
  trekk: Trekk[];
  er_utbetalt: boolean;
  rettighetshaver: Rettighetshaver;
  melding: string;
  id: string;
}

export interface Bruker {
  aktoerId: string;
  navn: string;
}

export interface UtbetalingResponse {
  kommendeUtbetalinger: HovedYtelse[];
  utbetalteUtbetalinger: HovedYtelse[];
  bruker: Bruker;
}
