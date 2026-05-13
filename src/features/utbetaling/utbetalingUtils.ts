import dayjs from "dayjs";
import "dayjs/locale/nb";
import type { Utbetaling } from "./utbetalingTypes";

export const formatToReadableDate = (date: string) => {
  return dayjs(date).locale("nb").format("D. MMMM ");
};

export const isKommende = (data: Utbetaling) => data.kommende && !data.sisteUtbetaling;
export const isIngenUtbetaling = (data: Utbetaling) => !data.kommende && !data.sisteUtbetaling;
export const isTidligereUtbetaling = (data: Utbetaling) => data.sisteUtbetaling && !data.kommende;
export const isUtbetalingList = (data: Utbetaling) => data.sisteUtbetaling && data.kommende;
