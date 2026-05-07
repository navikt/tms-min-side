import type { AmplitudeEvent } from "@navikt/nav-dekoratoren-moduler";
import { getAnalyticsInstance } from "@navikt/nav-dekoratoren-moduler";

type ExtendedAmplitudeEvent = AmplitudeEvent<"navigere", { kategori: string }>;

const logger = getAnalyticsInstance<ExtendedAmplitudeEvent>("tms-min-side");

export const logEvent = async (data: string, kategori: string, lenketekst: string) => {
  await logger("navigere", { komponent: data, kategori: kategori, lenketekst: lenketekst }).catch(() =>
    console.warn("Uninitialized amplitude"),
  );
};

export async function logMfEvent(name: string, metric: boolean) {
  await logger(name, { komponent: metric }).catch(() => console.warn("Uninitialized amplitude"));
}

export const logGroupedEvent = async (list: string) => {
  await logger("minside-composition", { composition: list }).catch(() => console.warn("Uninitialized amplitude"));
};

export const logContentEvent = async (event: string, value: boolean) => {
  await logger(event, { hasContent: value }).catch(() => console.warn("Uninitialized amplitude"));
};
