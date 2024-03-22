import { Language } from "@language/language.ts";
import { PersonalizedContent } from "@components/oversikt/microfrontendTypes.tsx";
import { getProduktPropertiesMap } from "@components/oversikt/produktkort/ProduktProperties.tsx";


export const getProduktProperties = (language: Language, personalizedContent?: PersonalizedContent) => {
  if (personalizedContent === undefined) return undefined;

  const produktPropertiesMap = getProduktPropertiesMap(language);
  const byKode = (a: string, b: string) => a.localeCompare(b);
  const toProduktProperties = (sakstema:string) => produktPropertiesMap[sakstema]

  return personalizedContent?.produktkort
    ?.sort(byKode)
    .map(toProduktProperties);
};

export const hasMicrofrontends = (microfrontends: any) => microfrontends !== undefined && microfrontends.length > 0;
