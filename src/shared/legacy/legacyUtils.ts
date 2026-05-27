import type { PersonalizedContent } from "@src/features/din-oversikt/DinOversiktTypes";
import { produktText } from "@src/features/din-oversikt/produktkort/ProduktText";
import type { Microfrontend } from "@src/shared/microfrontends/microfrontendTypes";
import type { Locale } from "@src/shared/utils/server/locale.ts";

export const getProduktPropertiesLegacy = (locale: Locale, personalizedContent?: PersonalizedContent) => {
  if (personalizedContent === undefined) return undefined;

  const produktPropertiesMap = getProduktPropertiesMapLegacy(locale);
  const byKode = (a: string, b: string) => a.localeCompare(b);
  const toProduktProperties = (sakstema: string) => produktPropertiesMap[sakstema];

  return personalizedContent?.produktkort?.sort(byKode).map(toProduktProperties);
};

export const hasMicrofrontendsLegacy = (microfrontends: Microfrontend[]) =>
  microfrontends !== undefined && microfrontends.length > 0;

export const hasAktueltMicrofrontendsLegacy = (microfrontends: Microfrontend[]) =>
  microfrontends !== undefined && microfrontends.length > 0;

type ProduktProperties = { produktnavn: string; tittel: string };

export function getProduktPropertiesMapLegacy(locale: Locale): Record<string, ProduktProperties> {
  const sykefraværConfig: ProduktProperties = {
    produktnavn: "sykefravær",
    tittel: produktText.sykefravær[locale],
  };

  return {
    DAG: {
      produktnavn: "dagpenger",
      tittel: produktText.dagpenger[locale],
    },
    FOR: {
      produktnavn: "foreldrepenger",
      tittel: produktText.foreldrepenger[locale],
    },
    HJE: {
      produktnavn: "hjelpemidler",
      tittel: produktText.hjelpemidler[locale],
    },
    KOM: {
      produktnavn: "sosialhjelp",
      tittel: produktText.sosialhjelp[locale],
    },
    PEN: {
      produktnavn: "pensjon",
      tittel: produktText.pensjon[locale],
    },
    SYK: sykefraværConfig,
    SYM: sykefraværConfig,
    UFO: {
      produktnavn: "uføretrygd",
      tittel: produktText.uføretrygd[locale],
    },
  };
}
