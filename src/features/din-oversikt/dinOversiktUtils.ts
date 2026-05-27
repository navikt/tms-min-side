import type { Microfrontend } from "@src/shared/microfrontends/microfrontendTypes.ts";
import type { Locale } from "@src/shared/utils/server/locale.ts";
import type { PersonalizedContent } from "./DinOversiktTypes";
import { getProduktPropertiesMap } from "./produktkort/ProduktProperties.tsx";

export const getProduktkortList = (locale: Locale, personalizedContent?: PersonalizedContent) => {
  if (personalizedContent === undefined) return undefined;

  const produktPropertiesMap = getProduktPropertiesMap(locale);
  const byKode = (a: string, b: string) => a.localeCompare(b);
  const toProduktProperties = (sakstema: string) => produktPropertiesMap[sakstema];

  return personalizedContent?.produktkort?.sort(byKode).map(toProduktProperties);
};

export const hasMicrofrontends = (microfrontends: Microfrontend[]) =>
  microfrontends !== undefined && microfrontends.length > 0;

export const hasAktueltMicrofrontends = (microfrontends: Microfrontend[]) =>
  microfrontends !== undefined && microfrontends.length > 0;
