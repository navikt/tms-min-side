import { Language } from "../../language/language.ts";
import { getProduktPropertiesMap } from "../../features/din-oversikt/produktkort/ProduktProperties.tsx";
import type { Microfrontend } from "../../microfrontends/microfrontendTypes.tsx";
import type { PersonalizedContent } from "../../features/din-oversikt/DinOversiktTypes";

export const getProduktkortList = (language: Language, personalizedContent?: PersonalizedContent) => {
  if (personalizedContent === undefined) return undefined;

  const produktPropertiesMap = getProduktPropertiesMap(language);
  const byKode = (a: string, b: string) => a.localeCompare(b);
  const toProduktProperties = (sakstema: string) => produktPropertiesMap[sakstema];

  return personalizedContent?.produktkort?.sort(byKode).map(toProduktProperties);
};

export const hasMicrofrontends = (microfrontends: Microfrontend[]) =>
  microfrontends !== undefined && microfrontends.length > 0;

export const hasAktueltMicrofrontends = (microfrontends: Microfrontend[]) =>
  microfrontends !== undefined && microfrontends.length > 0;
