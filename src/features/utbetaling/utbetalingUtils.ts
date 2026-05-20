import dayjs from "dayjs";
import "dayjs/locale/nb";
import type { Utbetaling } from "./utbetalingTypes";

export const formatToReadableDate = (date: string) => dayjs(date).locale("nb").format("D. MMMM ");

export const isKommende = (data: Utbetaling): boolean => !!data.kommende && !data.sisteUtbetaling;
export const isIngen = (data: Utbetaling): boolean => !data.kommende && !data.sisteUtbetaling;
export const isTidligere = (data: Utbetaling): boolean => !!data.sisteUtbetaling && !data.kommende;
export const isList = (data: Utbetaling): boolean => !!data.sisteUtbetaling && !!data.kommende;
