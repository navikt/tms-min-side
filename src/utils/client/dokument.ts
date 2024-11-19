import "dayjs";
import "dayjs/locale/nb";
import dayjs from "dayjs";
import type { Journalpost } from "@components/dokumenter/dokumenterTypes.ts";

dayjs.locale("nb");

export const formatDateMonth = (date: string) => dayjs(date).locale("nb").format("D. MMMM YYYY");

export const setAvsenderMottaker = (journalpost: Journalpost) => {
  if (!journalpost.avsender) {
    return journalpost.mottaker;
  } else {
    return journalpost.avsender;
  }
}