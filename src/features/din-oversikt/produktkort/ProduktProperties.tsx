import IkonDagpenger from "@src/features/din-oversikt/assets/IkonDagpenger";
import IkonForeldrepenger from "@src/features/din-oversikt/assets/IkonForeldrepenger";
import IkonHjelpemidler from "@src/features/din-oversikt/assets/IkonHjelpemidler";
import IkonPensjon from "@src/features/din-oversikt/assets/IkonPensjon";
import IkonSykefravær from "@src/features/din-oversikt/assets/IkonSykefravær";
import IkonUføretrygd from "@src/features/din-oversikt/assets/IkonUføretrygd";
import IkonØkonomiskSosialhjelp from "@src/features/din-oversikt/assets/IkonØkonomiskSosialhjelp";
import type { Language } from "@src/shared/utils/server/language.ts";
import { produktText } from "./ProduktText";
import { produktlinker as produktUrls } from "./ProduktUrls";

type ProduktProperties = { produktnavn: string; url: string; tittel: string; ingress: string; ikon: JSX.Element };

export function getProduktPropertiesMap(language: Language): Record<string, ProduktProperties> {
  const sykefraværConfig: ProduktProperties = {
    produktnavn: "sykefravær",
    url: produktUrls.sykefravær[language],
    tittel: produktText.sykefravær[language],
    ingress: produktText.sykefraværIngress[language],
    ikon: <IkonSykefravær />,
  };

  return {
    DAG: {
      produktnavn: "dagpenger",
      url: produktUrls.dagpenger[language],
      tittel: produktText.dagpenger[language],
      ingress: produktText.generellIngress[language],
      ikon: <IkonDagpenger />,
    },
    FOR: {
      produktnavn: "foreldrepenger",
      url: produktUrls.foreldrepenger[language],
      tittel: produktText.foreldrepenger[language],
      ingress: produktText.generellIngress[language],
      ikon: <IkonForeldrepenger />,
    },
    HJE: {
      produktnavn: "hjelpemidler",
      url: produktUrls.hjelpemidler[language],
      tittel: produktText.hjelpemidler[language],
      ingress: produktText.generellIngress[language],
      ikon: <IkonHjelpemidler />,
    },
    KOM: {
      produktnavn: "sosialhjelp",
      url: produktUrls.sosialhjelp[language],
      tittel: produktText.sosialhjelp[language],
      ingress: produktText.sosialhjelpIngress[language],
      ikon: <IkonØkonomiskSosialhjelp />,
    },
    PEN: {
      produktnavn: "pensjon",
      url: produktUrls.pensjon[language],
      tittel: produktText.pensjon[language],
      ingress: produktText.pensjonIngress[language],
      ikon: <IkonPensjon />,
    },
    SYK: sykefraværConfig,
    SYM: sykefraværConfig,
    UFO: {
      produktnavn: "uføretrygd",
      url: produktUrls.uføretrygd[language],
      tittel: produktText.uføretrygd[language],
      ingress: produktText.uføretrygdIngress[language],
      ikon: <IkonUføretrygd />,
    },
  };
}

export default ProduktProperties;
