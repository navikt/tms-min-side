import { getAmplitudeInstance } from "@navikt/nav-dekoratoren-moduler";

const logger = getAmplitudeInstance("dekoratoren");

export const logEvent = (data: string, kategori: string, lenketekst: string) => {
  logger("navigere", { komponent: data, kategori: kategori, lenketekst: lenketekst }).catch(() =>
    console.warn("Uninitialized amplitude"),
  );
};

export function logMfEvent(name: string, metric: boolean) {
  logger(name, { komponent: metric }).catch(() => console.warn("Uninitialized amplitude"));
}

export const logGroupedEvent = (list: string) => {
  logger("minside-composition", { composition: list }).catch(() => console.warn("Uninitialized amplitude"));
};
