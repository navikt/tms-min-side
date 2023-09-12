import { logAmplitudeEvent } from "@navikt/nav-dekoratoren-moduler";

export const logEvent = (event: string, data?: Record<string, string>) => {
  logAmplitudeEvent({
    origin: "tms-min-side",
    eventName: event,
    eventData: data,
  });
};
