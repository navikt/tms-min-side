import { getEnvironmentClientSide } from "@utils/client/environment.ts";

const produktlinkerDev = {
  dagpenger: {
    nb: "https://arbeid.intern.dev.nav.no/arbeid/dagpenger/mine-dagpenger",
    nn: "https://arbeid.intern.dev.nav.no/arbeid/dagpenger/mine-dagpenger",
    en: "https://arbeid.intern.dev.nav.no/arbeid/dagpenger/mine-dagpenger",
  },
  foreldrepenger: {
    nb: "https://foreldrepenger.nav.no/",
    nn: "https://foreldrepenger.nav.no/",
    en: "https://foreldrepenger.nav.no/",
  },
  hjelpemidler: {
    nb: "https://www.nav.no/hjelpemidler/dinehjelpemidler/",
    nn: "https://www.nav.no/hjelpemidler/dinehjelpemidler/",
    en: "https://www.nav.no/hjelpemidler/dinehjelpemidler/",
  },
  pensjon: {
    nb: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
    nn: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
    en: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
  },
  sykefravær: {
    nb: "https://www.nav.no/syk/sykefravaer",
    nn: "https://www.nav.no/syk/sykefravaer",
    en: "https://www.nav.no/syk/sykefravaer",
  },
  uføretrygd: {
    nb: "https://www.nav.no/uforetrygd/selvbetjening",
    nn: "https://www.nav.no/uforetrygd/selvbetjening",
    en: "https://www.nav.no/uforetrygd/selvbetjening",
  },
  sosialhjelp: {
    nb: "https://www.nav.no/sosialhjelp/innsyn/",
    nn: "https://www.nav.no/sosialhjelp/innsyn/",
    en: "https://www.nav.no/sosialhjelp/innsyn/",
  },
};

const produktlinkerProd = {
  dagpenger: {
    nb: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
    nn: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
    en: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
  },
  foreldrepenger: {
    nb: "https://foreldrepenger.nav.no/",
    nn: "https://foreldrepenger.nav.no/",
    en: "https://foreldrepenger.nav.no/",
  },
  hjelpemidler: {
    nb: "https://www.nav.no/hjelpemidler/dinehjelpemidler/",
    nn: "https://www.nav.no/hjelpemidler/dinehjelpemidler/",
    en: "https://www.nav.no/hjelpemidler/dinehjelpemidler/",
  },
  pensjon: {
    nb: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
    nn: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
    en: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
  },
  sykefravær: {
    nb: "https://www.nav.no/syk/sykefravaer",
    nn: "https://www.nav.no/syk/sykefravaer",
    en: "https://www.nav.no/syk/sykefravaer",
  },
  uføretrygd: {
    nb: "https://www.nav.no/pselv/publisering/uforetrygd.jsf?context=ut",
    nn: "https://www.nav.no/pselv/publisering/uforetrygd.jsf?context=ut",
    en: "https://www.nav.no/pselv/publisering/uforetrygd.jsf?context=ut",
  },
  sosialhjelp: {
    nb: "https://www.nav.no/sosialhjelp/innsyn/",
    nn: "https://www.nav.no/sosialhjelp/innsyn/",
    en: "https://www.nav.no/sosialhjelp/innsyn/",
  },
};
const produktlinkConfig = {
  local: produktlinkerDev,
  dev: produktlinkerDev,
  prod: produktlinkerProd,
};

export const produktlinker = produktlinkConfig[getEnvironmentClientSide()];
