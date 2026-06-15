import dayjs from "dayjs";
import "dayjs/locale/nb";
import type { Utbetaling } from "./utbetalingTypes";

export const formatToReadableDate = (date: string) => dayjs(date).locale("nb").format("D. MMMM ");

const total = (utbetaling: Utbetaling): number =>
  utbetaling.kommendeUtbetalinger.length + utbetaling.sisteUtbetalinger.length;

export const isIngen = (utbetaling: Utbetaling): boolean => total(utbetaling) === 0;

export const isKommende = (utbetaling: Utbetaling): boolean =>
  utbetaling.kommendeUtbetalinger.length === 1 && utbetaling.sisteUtbetalinger.length === 0;

export const isTidligere = (utbetaling: Utbetaling): boolean =>
  utbetaling.sisteUtbetalinger.length === 1 && utbetaling.kommendeUtbetalinger.length === 0;

export const isList = (utbetaling: Utbetaling): boolean => total(utbetaling) >= 2;
