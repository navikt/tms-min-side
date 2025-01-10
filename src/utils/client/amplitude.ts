import { init, track } from "@amplitude/analytics-browser";

const APP_NAME = "tms-min-side";

export const logEvent = (metric: string, kategori: string, lenketekst: string) => {
  track("navigere", {
    app: APP_NAME,
    komponent: metric,
    kategori: kategori,
    lenketekst: lenketekst
  });
};

export function logMfEvent(name: string, metric: boolean) {
  track(name, {
    app: APP_NAME,
    komponent: metric,
  });
}

export const logGroupedEvent = (metric: string) => {
  track("minside-composition", {
    app: APP_NAME,
    eventName: "minside-composition",
    eventData: {
      composition: metric,
    },
  });
};

export const initAmplitude = () => {
  init("default", undefined, {
    serverUrl: "https://amplitude.nav.no/collect-auto",
    ingestionMetadata: {
      sourceName: window.location.toString(),
    },
  });
};
