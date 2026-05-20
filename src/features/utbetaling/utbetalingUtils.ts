import dayjs from "dayjs";
import "dayjs/locale/nb";
import type { Utbetaling } from "./utbetalingTypes";

export const formatToReadableDate = (date: string) => dayjs(date).locale("nb").format("D. MMMM ");

export const isIngen = (utbetaling: Utbetaling): boolean => !utbetaling.kommende && !utbetaling.sisteUtbetaling;
export const isKommende = (utbetaling: Utbetaling): boolean => !!utbetaling.kommende && !utbetaling.sisteUtbetaling;
export const isTidligere = (utbetaling: Utbetaling): boolean => !!utbetaling.sisteUtbetaling && !utbetaling.kommende;
export const isList = (utbetaling: Utbetaling): boolean => !!utbetaling.sisteUtbetaling && !!utbetaling.kommende;
