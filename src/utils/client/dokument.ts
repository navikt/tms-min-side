import "dayjs";
import "dayjs/locale/nb";
import dayjs from "dayjs";
import type { DokumentType } from "@components/dokumenter/dokumenterTypes.ts";

dayjs.locale("nb");

export const formatDateMonth = (date: string) => dayjs(date).locale("nb").format("D. MMMM YYYY");

export const setAvsenderMottaker = (dokument: DokumentType) => {
  if (!dokument.avsender) {
    return dokument.mottaker;
  } else {
    return dokument.avsender;
  }
};
