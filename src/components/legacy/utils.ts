import { Language } from "@language/language.ts";
import { Microfrontend, PersonalizedContent } from "../microfrontend/microfrontendTypes";
import { produktText } from "../din-oversikt/produktkort/ProduktText";

export const getProduktPropertiesLegacy = (language: Language, personalizedContent?: PersonalizedContent) => {
  if (personalizedContent === undefined) return undefined;

  const produktPropertiesMap = getProduktPropertiesMapLegacy(language);
  const byKode = (a: string, b: string) => a.localeCompare(b);
  const toProduktProperties = (sakstema: string) => produktPropertiesMap[sakstema];

  return personalizedContent?.produktkort?.sort(byKode).map(toProduktProperties);
};

export const hasMicrofrontendsLegacy = (microfrontends: Microfrontend[]) =>
  microfrontends !== undefined && microfrontends.length > 0;

export const hasAktueltMicrofrontendsLegacy = (microfrontends: Microfrontend[]) =>
  microfrontends !== undefined && microfrontends.length > 0;

type ProduktProperties = { produktnavn: string; tittel: string; };

export function getProduktPropertiesMapLegacy(language: Language): Record<string, ProduktProperties> {
  const sykefraværConfig: ProduktProperties = {
    produktnavn: "sykefravær",
    tittel: produktText.sykefravær[language],
  };

  return {
    DAG: {
      produktnavn: "dagpenger",
      tittel: produktText.dagpenger[language],
    },
    FOR: {
      produktnavn: "foreldrepenger",
      tittel: produktText.foreldrepenger[language],
    },
    HJE: {
      produktnavn: "hjelpemidler",
      tittel: produktText.hjelpemidler[language],
    },
    KOM: {
      produktnavn: "sosialhjelp",
      tittel: produktText.sosialhjelp[language],
    },
    PEN: {
      produktnavn: "pensjon",
      tittel: produktText.pensjon[language],
    },
    SYK: sykefraværConfig,
    SYM: sykefraværConfig,
    UFO: {
      produktnavn: "uføretrygd",
      tittel: produktText.uføretrygd[language],
    },
  };
}
