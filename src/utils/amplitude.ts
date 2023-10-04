import { logAmplitudeEvent } from "@navikt/nav-dekoratoren-moduler";

export const logEvent = (data: string, kategori: string, lenketekst: string) => {
  logAmplitudeEvent({
    origin: "tms-min-side",
    eventName: "navigere",
    eventData: {
      komponent: data,
      kategori: kategori,
      lenketekst: lenketekst
    },
  });
};
