import dayjs from "dayjs";
import "dayjs/locale/nb";
import type { Utbetaling, UtbetalingData } from "./utbetalingTypes";

export const formatToReadableDate = (date: string) => dayjs(date).locale("nb").format("D. MMMM ");

export type UtbetalingState =
  | { type: "ingen" }
  | { type: "kommende"; kommende: UtbetalingData }
  | { type: "tidligere"; tidligere: UtbetalingData }
  | { type: "liste"; kommende: UtbetalingData; tidligere: UtbetalingData };

export const getUtbetalingState = (data: Utbetaling): UtbetalingState => {
  if (data.kommende && data.sisteUtbetaling) {
    return { type: "liste", kommende: data.kommende, tidligere: data.sisteUtbetaling };
  }

  if (data.kommende) {
    return { type: "kommende", kommende: data.kommende };
  }

  if (data.sisteUtbetaling) {
    return { type: "tidligere", tidligere: data.sisteUtbetaling };
  }

  return { type: "ingen" };
};
