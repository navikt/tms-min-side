import { useContext } from "react";
import IkonDagpenger from "../assets/IkonDagpenger";
import IkonForeldrepenger from "../assets/IkonForeldrepenger";
import IkonHjelpemidler from "../assets/IkonHjelpemidler";
import IkonPensjon from "../assets/IkonPensjon";
import IkonSykefravær from "../assets/IkonSykefravær";
import IkonUføretrygd from "../assets/IkonUføretrygd";
import IkonØkonomiskSosialhjelp from "../assets/IkonØkonomiskSosialhjelp";
import { produktlinker as produktUrls } from "./ProduktUrls";
import { produktText } from "./ProduktText";
import type { Language } from "@language/language.ts";

type ProduktConfig = { produktnavn: string; url: string; tittel: string; ingress: string; ikon: JSX.Element };

export function getProduktConfigMap(language: Language): Record<string, ProduktConfig> {

  const sykefraværConfig: ProduktConfig = {
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

export default ProduktConfig;
