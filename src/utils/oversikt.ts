import { Language } from "@language/language.ts";
import { PersonalizedContent } from "@components/oversikt/microfrontendTypes.tsx";
import ProduktProperties, { getProduktPropertiesMap } from "@components/oversikt/produktkort/ProduktProperties.tsx";
import { isMeldekortbruker, MeldekortDataFraApi } from "@components/oversikt/meldekort/meldekortTypes.ts";

export const getProduktProperties = (language: Language, personalizedContent?: PersonalizedContent) => {
  if (personalizedContent === undefined) return undefined;

  const produktPropertiesMap = getProduktPropertiesMap(language);

  return personalizedContent?.produktkort
    ?.sort((a, b) => a.localeCompare(b))
    .map((sakstema) => produktPropertiesMap[sakstema]);
};

export const hasProduktkort = (produktConfig?: ProduktProperties[]) => produktConfig !== undefined;
export const hasMicrofrontends = (microfrontends: any) => microfrontends !== undefined && microfrontends.length > 0;
export const hasMeldekort = (meldekortFraApi?: MeldekortDataFraApi) => isMeldekortbruker(meldekortFraApi);
export const isUnderOppfolging = (oppfolging: any) => oppfolging?.underOppfolging;
export const isStandardInnsats = (arbeidssoker: any) => arbeidssoker?.erArbeidssoker && arbeidssoker?.erStandard;
