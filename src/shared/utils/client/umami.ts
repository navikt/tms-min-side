import { getAnalyticsInstance } from "@navikt/nav-dekoratoren-moduler";

type NavigereEventData = { komponent: string; kategori: string; lenketekst: string };

const logger = getAnalyticsInstance("tms-min-side");

export const logEvent = async (data: string, kategori: string, lenketekst: string) => {
  const eventData: NavigereEventData = { komponent: data, kategori: kategori, lenketekst: lenketekst };
  await logger.custom("navigere", eventData).catch(() => console.warn("Uninitialized amplitude"));
};

export async function logMfEvent(name: string, metric: boolean) {
  await logger.custom(name, { komponent: metric }).catch(() => console.warn("Uninitialized amplitude"));
}

export const logGroupedEvent = async (list: string) => {
  await logger
    .custom("minside-composition", { composition: list })
    .catch(() => console.warn("Uninitialized amplitude"));
};

export const logContentEvent = async (event: string, value: boolean) => {
  await logger.custom(event, { hasContent: value }).catch(() => console.warn("Uninitialized amplitude"));
};
