import IkonDagpenger from "@src/features/din-oversikt/assets/IkonDagpenger";
import IkonForeldrepenger from "@src/features/din-oversikt/assets/IkonForeldrepenger";
import IkonHjelpemidler from "@src/features/din-oversikt/assets/IkonHjelpemidler";
import IkonPensjon from "@src/features/din-oversikt/assets/IkonPensjon";
import IkonSykefravær from "@src/features/din-oversikt/assets/IkonSykefravær";
import IkonUføretrygd from "@src/features/din-oversikt/assets/IkonUføretrygd";
import IkonØkonomiskSosialhjelp from "@src/features/din-oversikt/assets/IkonØkonomiskSosialhjelp";
import type { Locale } from "@src/shared/utils/server/locale.ts";
import type { ReactElement } from "react";
import { produktText } from "./ProduktText";
import { produktlinker as produktUrls } from "./ProduktUrls";

type ProduktProperties = { produktnavn: string; url: string; tittel: string; ingress: string; ikon: ReactElement };

export function getProduktPropertiesMap(locale: Locale): Record<string, ProduktProperties> {
  const sykefraværConfig: ProduktProperties = {
    produktnavn: "sykefravær",
    url: produktUrls.sykefravær[locale],
    tittel: produktText.sykefravær[locale],
    ingress: produktText.sykefraværIngress[locale],
    ikon: <IkonSykefravær />,
  };

  return {
    DAG: {
      produktnavn: "dagpenger",
      url: produktUrls.dagpenger[locale],
      tittel: produktText.dagpenger[locale],
      ingress: produktText.generellIngress[locale],
      ikon: <IkonDagpenger />,
    },
    FOR: {
      produktnavn: "foreldrepenger",
      url: produktUrls.foreldrepenger[locale],
      tittel: produktText.foreldrepenger[locale],
      ingress: produktText.generellIngress[locale],
      ikon: <IkonForeldrepenger />,
    },
    HJE: {
      produktnavn: "hjelpemidler",
      url: produktUrls.hjelpemidler[locale],
      tittel: produktText.hjelpemidler[locale],
      ingress: produktText.generellIngress[locale],
      ikon: <IkonHjelpemidler />,
    },
    KOM: {
      produktnavn: "sosialhjelp",
      url: produktUrls.sosialhjelp[locale],
      tittel: produktText.sosialhjelp[locale],
      ingress: produktText.sosialhjelpIngress[locale],
      ikon: <IkonØkonomiskSosialhjelp />,
    },
    PEN: {
      produktnavn: "pensjon",
      url: produktUrls.pensjon[locale],
      tittel: produktText.pensjon[locale],
      ingress: produktText.pensjonIngress[locale],
      ikon: <IkonPensjon />,
    },
    SYK: sykefraværConfig,
    SYM: sykefraværConfig,
    UFO: {
      produktnavn: "uføretrygd",
      url: produktUrls.uføretrygd[locale],
      tittel: produktText.uføretrygd[locale],
      ingress: produktText.uføretrygdIngress[locale],
      ikon: <IkonUføretrygd />,
    },
  };
}

export default ProduktProperties;
