import { logAmplitudeEvent } from "@navikt/nav-dekoratoren-moduler";

export const logEvent = (data: string) => {
  logAmplitudeEvent({
    origin: "tms-min-side",
    eventName: "navigere",
    eventData: {
      komponent: data
    },
  });
};
