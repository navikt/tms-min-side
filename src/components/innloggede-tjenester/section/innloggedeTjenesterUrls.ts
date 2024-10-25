import { getEnvironment } from "@utils/server/environment.ts";

const jobbLenkerProd = [
  {
    nb: "Aktivitetsplan",
    nn: "Aktivitetsplan",
    en: "Activity plan",
    url: {
      nb: "https://aktivitetsplan.nav.no/",
      nn: "https://aktivitetsplan.nav.no/",
      en: "https://aktivitetsplan.nav.no/",
    },
  },
  {
    nb: "CV til bruk ved jobbsøk (Arbeidsplassen)",
    nn: "CV",
    en: "CV",
    url: {
      nb: "https://arbeidsplassen.nav.no/min-side",
      nn: "https://arbeidsplassen.nav.no/min-side",
      en: "https://arbeidsplassen.nav.no/min-side",
    },
  },
  {
    nb: "Dialog med veilederen din",
    nn: "Dialog med rettleiaren din",
    en: "Dialogue with your advisor",
    url: {
      nb: "http://nav.no/arbeid/dialog",
      nn: "http://nav.no/arbeid/dialog",
      en: "http://nav.no/arbeid/dialog",
    },
  },
  {
    nb: "Jobbsporet ditt",
    nn: "Jobbsporet ditt",
    en: "Job track",
    url: {
      nb: "https://jobbsporet.nav.no ",
      nn: "https://jobbsporet.nav.no ",
      en: "https://jobbsporet.nav.no ",
    }
  },
  {
    nb: "Ledige stillinger (Arbeidsplassen)",
    nn: "Ledige stillingar (Arbeidsplassen)",
    en: "Job listings (Arbeidsplassen)",
    url: {
      nb: "https://arbeidsplassen.nav.no/stillinger",
      nn: "https://arbeidsplassen.nav.no/stillinger",
      en: "https://arbeidsplassen.nav.no/stillinger",
    }
  },
  {
    nb: "Meldekort",
    nn: "Meldekort",
    en: "Employment status form",
    url: {
      nb: "https://www.nav.no/meldekort/",
      nn: "https://www.nav.no/meldekort/",
      en: "https://www.nav.no/meldekort/",
    }
  },
  {
    nb: "Registrer deg som arbeidssøker",
    nn: "Registrer deg som arbeidssøkar",
    en: "Register as a job seeker",
    url: {
      nb: "https://www.nav.no/arbeid/registrering/",
      nn: "https://www.nav.no/arbeid/registrering/",
      en: "https://www.nav.no/arbeid/registrering/",
    }
  },
];

const jobbLenkerDev = [
  {
    nb: "Aktivitetsplan",
    nn: "Aktivitetsplan",
    en: "Activity plan",
    url: {
      nb: "https://aktivitetsplan.nav.no/",
      nn: "https://aktivitetsplan.nav.no/",
      en: "https://aktivitetsplan.nav.no/",
    },
  },
  {
    nb: "CV til bruk ved jobbsøk (Arbeidsplassen)",
    nn: "CV",
    en: "CV",
    url: {
      nb: "https://arbeidsplassen.nav.no/min-side",
      nn: "https://arbeidsplassen.nav.no/min-side",
      en: "https://arbeidsplassen.nav.no/min-side",
    },
  },
  {
    nb: "Dialog med din lokale veileder",
    nn: "Dialog med den lokale rettleiaren din",
    en: "Communication with your local consultant",
    url: {
      nb: "http://nav.no/arbeid/dialog",
      nn: "http://nav.no/arbeid/dialog",
      en: "http://nav.no/arbeid/dialog",
    },
  },
  {
    nb: "Jobbsporet ditt",
    nn: "Jobbsporet ditt",
    en: "Job track",
    url: {
      nb: "https://jobbsporet.nav.no ",
      nn: "https://jobbsporet.nav.no ",
      en: "https://jobbsporet.nav.no ",
    }
  },
  {
    nb: "Ledige stillinger (Arbeidsplassen)",
    nn: "Ledige stillingar (Arbeidsplassen)",
    en: "Job listings (Arbeidsplassen)",
    url: {
      nb: "https://arbeidsplassen.nav.no/stillinger",
      nn: "https://arbeidsplassen.nav.no/stillinger",
      en: "https://arbeidsplassen.nav.no/stillinger",
    }
  },
  {
    nb: "Meldekort",
    nn: "Meldekort",
    en: "Employment status form",
    url: {
      nb: "https://www.nav.no/meldekort/",
      nn: "https://www.nav.no/meldekort/",
      en: "https://www.nav.no/meldekort/",
    }
  },
  {
    nb: "Registrer deg som arbeidssøker",
    nn: "Registrer deg som arbeidssøkar",
    en: "Register as a job seeker",
    url: {
      nb: "https://arbeidssokerregistrering.nav.no/",
      nn: "https://arbeidssokerregistrering.nav.no/",
      en: "https://arbeidssokerregistrering.nav.no/",
    }
  },
];

const hjelpemidlerLenkerProd = [
  {
    nb: "AAP (arbeidsavklaringspenger)",
    nn: "AAP (abeidsavklaringspengar)",
    en: "Work assessment allowance (AAP)",
    url: {
      nb: "https://www.nav.no/aap/mine-aap/",
      nn: "https://www.nav.no/aap/mine-aap/nn/",
      en: "https://www.nav.no/aap/mine-aap/",
    }
  },
  {
    nb: "Dagpenger",
    nn: "Dagpengar ",
    en: "Unemployment benefits (dagpenger)",
    url: {
      nb: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
      nn: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
      en: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
    }
  },
  {
    nb: "Foreldrepenger",
    nn: "Foreldrepengar",
    en: "Parental benefit",
    url: {
      nb: "https://foreldrepenger.nav.no/",
      nn: "https://foreldrepenger.nav.no/",
      en: "https://foreldrepenger.nav.no/",
    }
  },
  {
    nb: "Hjelpemidler",
    nn: "Hjelpemiddel",
    en: "Assistive technology",
    url: {
      nb: "https://www.nav.no/hjelpemidler/dinehjelpemidler/",
      nn: "https://www.nav.no/hjelpemidler/dinehjelpemidler/",
      en: "https://www.nav.no/hjelpemidler/dinehjelpemidler/",
    }
  },
  {
    nb: "Pleiepenger for sykt barn",
    nn: "Pleiepengar for sjukt barn",
    en: "Attendance allowance for a sick child",
    url: {
      nb: "https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn",
      nn: "https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn",
      en: "https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn",
    }
  },
  {
    nb: "Pensjon",
    nn: "Pensjon",
    en: "Pension",
    url: {
      nb: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
      nn: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
      en: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
    }
  },
  {
    nb: "Sykefravær",
    nn: "Sjukefråvær",
    en: "Absence due to sickness",
    url: {
      nb: "https://www.nav.no/syk/sykefravaer",
      nn: "https://www.nav.no/syk/sykefravaer",
      en: "https://www.nav.no/syk/sykefravaer",
    }
  },
  {
    nb: "Uføretrygd",
    nn: "Uføretrygd",
    en: "Disability benefit",
    url: {
      nb: "https://www.nav.no/pselv/publisering/uforetrygd.jsf?context=ut",
      nn: "https://www.nav.no/pselv/publisering/uforetrygd.jsf?context=ut",
      en: "https://www.nav.no/pselv/publisering/uforetrygd.jsf?context=ut",
    }
  },
  {
    nb: "Yrkesskade og yrkessykdom",
    nn: "Yrkesskade og yrkessjukdom",
    en: "Occupational injury and occupational illness",
    url: {
      nb: "https://yrkesskadeoversikt.nav.no/",
      nn: "https://yrkesskadeoversikt.nav.no/",
      en: "https://yrkesskadeoversikt.nav.no/",
    }
  },
  {
    nb: "Økonomisk sosialhjelp",
    nn: "Økonomisk sosialhjelp",
    en: "Financial assistance",
    url: {
      nb: "https://www.nav.no/sosialhjelp/innsyn/",
      nn: "https://www.nav.no/sosialhjelp/innsyn/",
      en: "https://www.nav.no/sosialhjelp/innsyn/",
    }
  },
];

const hjelpemidlerLenkerDev = [
  {
    nb: "AAP (arbeidsavklaringspenger)",
    nn: "AAP (abeidsavklaringspengar)",
    en: "Work assessment allowance (AAP)",
    url: {
      nb: "https://www.nav.no/aap/mine-aap/",
      nn: "https://www.nav.no/aap/mine-aap/nn/",
      en: "https://www.nav.no/aap/mine-aap/",
    }
  },
  {
    nb: "Dagpenger",
    nn: "Dagpengar ",
    en: "Unemployment benefits (dagpenger)",
    url: {
      nb: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
      nn: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
      en: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
    }
  },
  {
    nb: "Foreldrepenger",
    nn: "Foreldrepengar",
    en: "Parental benefit",
    url: {
      nb: "https://foreldrepenger.nav.no/",
      nn: "https://foreldrepenger.nav.no/",
      en: "https://foreldrepenger.nav.no/",
    }
  },
  {
    nb: "Hjelpemidler",
    nn: "Hjelpemiddel",
    en: "Assistive technology",
    url: {
      nb: "https://www.nav.no/hjelpemidler/dinehjelpemidler/",
      nn: "https://www.nav.no/hjelpemidler/dinehjelpemidler/",
      en: "https://www.nav.no/hjelpemidler/dinehjelpemidler/",
    }
  },
  {
    nb: "Pleiepenger for sykt barn",
    nn: "Pleiepengar for sjukt barn",
    en: "Attendance allowance for a sick child",
    url: {
      nb: "https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn",
      nn: "https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn",
      en: "https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn",
    }
  },
  {
    nb: "Pensjon",
    nn: "Pensjon",
    en: "Pension",
    url: {
      nb: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
      nn: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
      en: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
    }
  },
  {
    nb: "Sykefravær",
    nn: "Sjukefråvær",
    en: "Absence due to sickness",
    url: {
      nb: "https://www.nav.no/syk/sykefravaer",
      nn: "https://www.nav.no/syk/sykefravaer",
      en: "https://www.nav.no/syk/sykefravaer",
    }
  },
  {
    nb: "Uføretrygd",
    nn: "Uføretrygd",
    en: "Disability benefit",
    url: {
      nb: "https://www.nav.no/pselv/publisering/uforetrygd.jsf?context=ut",
      nn: "https://www.nav.no/pselv/publisering/uforetrygd.jsf?context=ut",
      en: "https://www.nav.no/pselv/publisering/uforetrygd.jsf?context=ut",
    }
  },
  {
    nb: "Yrkesskade og yrkessykdom",
    nn: "Yrkesskade og yrkessjukdom",
    en: "Occupational injury and occupational illness",
    url: {
      nb: "https://yrkesskadeoversikt.intern.dev.nav.no/",
      nn: "https://yrkesskadeoversikt.intern.dev.nav.no/",
      en: "https://yrkesskadeoversikt.intern.dev.nav.no/",
    }
  },
  {
    nb: "Økonomisk sosialhjelp",
    nn: "Økonomisk sosialhjelp",
    en: "Financial assistance",
    url: {
      nb: "https://www.nav.no/sosialhjelp/innsyn/",
      nn: "https://www.nav.no/sosialhjelp/innsyn/",
      en: "https://www.nav.no/sosialhjelp/innsyn/",
    }
  },
];

const personopplysningLenkerProd = [
  {
    nb: "Adresse (se og endre)",
    nn: "Adresse (sjå og endre)",
    en: "Addresses",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/#adresser",
      nn: "https://www.nav.no/person/personopplysninger/nn/#adresser",
      en: "https://www.nav.no/person/personopplysninger/en/#adresser",
    }
  },
  {
    nb: "Arbeidsforhold",
    nn: "Arbeidsforhold",
    en: "Employment relationship",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/#arbeidsforhold",
      nn: "https://www.nav.no/person/personopplysninger/nn/#arbeidsforhold",
      en: "https://www.nav.no/person/personopplysninger/en/#arbeidsforhold",
    }
  },
  {
    nb: "Ditt NAV-kontor",
    nn: "Ditt NAV-kontor",
    en: "Your NAV office",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/#ditt-nav-kontor",
      nn: "https://www.nav.no/person/personopplysninger/nn/#ditt-nav-kontor",
      en: "https://www.nav.no/person/personopplysninger/en/#ditt-nav-kontor",
    }
  },
  {
    nb: "Fullmakt",
    nn: "Fullmakt",
    en: "Powers of attorney",
    url: {
      nb: "https://www.nav.no/person/pdl-fullmakt-ui",
      nn: "https://www.nav.no/person/pdl-fullmakt-ui",
      en: "https://www.nav.no/person/pdl-fullmakt-ui",
    }
  },
  {
    nb: "Institusjonsopphold",
    nn: "Institusjonsopphald",
    en: "Institutional stays",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/institusjonsopphold",
      nn: "https://www.nav.no/person/personopplysninger/nn/institusjonsopphold",
      en: "https://www.nav.no/person/personopplysninger/en/institusjonsopphold",
    }
  },
  {
    nb: "Kontaktinformasjon",
    nn: "Kontaktinformasjon",
    en: "Contact information",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/#kontaktinformasjon",
      nn: "https://www.nav.no/person/personopplysninger/nn/#kontaktinformasjon",
      en: "https://www.nav.no/person/personopplysninger/en/#kontaktinformasjon",
    }
  },
  {
    nb: "Kontonummer for utbetaling",
    nn: "Kontonummer for utbetaling",
    en: "Account number for payment",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/#utbetaling",
      nn: "https://www.nav.no/person/personopplysninger/nn/#utbetaling",
      en: "https://www.nav.no/person/personopplysninger/en/#utbetaling",
    }
  },
  {
    nb: "Medlemskap i folketrygden",
    nn: "Medlemskap i folketrygda",
    en: "Membership in the National Insurance Scheme",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/medlemskap-i-folketrygden",
      nn: "https://www.nav.no/person/personopplysninger/nn/medlemskap-i-folketrygden",
      en: "https://www.nav.no/person/personopplysninger/en/medlemskap-i-folketrygden",
    }
  },
  {
    nb: "Personalia",
    nn: "Personalia",
    en: "Personal data",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/#personalia",
      nn: "https://www.nav.no/person/personopplysninger/nn/#personalia",
      en: "https://www.nav.no/person/personopplysninger/en/#personalia",
    }
  },
];

const personopplysningLenkerDev = [
  {
    nb: "Adresse (se og endre)",
    nn: "Adresse (sjå og endre)",
    en: "Addresses",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/#adresser",
      nn: "https://www.nav.no/person/personopplysninger/nn/#adresser",
      en: "https://www.nav.no/person/personopplysninger/en/#adresser",
    }
  },
  {
    nb: "Arbeidsforhold",
    nn: "Arbeidsforhold",
    en: "Employment relationship",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/#arbeidsforhold",
      nn: "https://www.nav.no/person/personopplysninger/nn/#arbeidsforhold",
      en: "https://www.nav.no/person/personopplysninger/en/#arbeidsforhold",
    }
  },
  {
    nb: "Ditt NAV-kontor",
    nn: "Ditt NAV-kontor",
    en: "Your NAV office",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/#ditt-nav-kontor",
      nn: "https://www.nav.no/person/personopplysninger/nn/#ditt-nav-kontor",
      en: "https://www.nav.no/person/personopplysninger/en/#ditt-nav-kontor",
    }
  },
  {
    nb: "Fullmakt",
    nn: "Fullmakt",
    en: "Powers of attorney",
    url: {
      nb: "https://www.nav.no/person/pdl-fullmakt-ui",
      nn: "https://www.nav.no/person/pdl-fullmakt-ui",
      en: "https://www.nav.no/person/pdl-fullmakt-ui",
    }
  },
  {
    nb: "Institusjonsopphold",
    nn: "Institusjonsopphald",
    en: "Institutional stays",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/institusjonsopphold",
      nn: "https://www.nav.no/person/personopplysninger/nn/institusjonsopphold",
      en: "https://www.nav.no/person/personopplysninger/en/institusjonsopphold",
    }
  },
  {
    nb: "Kontaktinformasjon",
    nn: "Kontaktinformasjon",
    en: "Contact information",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/#kontaktinformasjon",
      nn: "https://www.nav.no/person/personopplysninger/nn/#kontaktinformasjon",
      en: "https://www.nav.no/person/personopplysninger/en/#kontaktinformasjon",
    }
  },
  {
    nb: "Kontonummer for utbetaling",
    nn: "Kontonummer for utbetaling",
    en: "Account number for payment",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/#utbetaling",
      nn: "https://www.nav.no/person/personopplysninger/nn/#utbetaling",
      en: "https://www.nav.no/person/personopplysninger/en/#utbetaling",
    }
  },
  {
    nb: "Medlemskap i folketrygden",
    nn: "Medlemskap i folketrygda",
    en: "Membership in the National Insurance Scheme",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/medlemskap-i-folketrygden",
      nn: "https://www.nav.no/person/personopplysninger/nn/medlemskap-i-folketrygden",
      en: "https://www.nav.no/person/personopplysninger/en/medlemskap-i-folketrygden",
    }
  },
  {
    nb: "Personalia",
    nn: "Personalia",
    en: "Personal data",
    url: {
      nb: "https://www.nav.no/person/personopplysninger/nb/#personalia",
      nn: "https://www.nav.no/person/personopplysninger/nn/#personalia",
      en: "https://www.nav.no/person/personopplysninger/en/#personalia",
    }
  },
];

const annetLenkerProd = [
  {
    nb: "Pensjonskalkulator",
    nn: "Pensjonskalkulator",
    en: "Calculate pensions",
    url: {
      nb: "https://www.nav.no/pensjon/kalkulator/login",
      nn: "https://www.nav.no/pensjon/kalkulator/login",
      en: "https://www.nav.no/pensjon/kalkulator/login",
    }
  },
  {
    nb: "Dokumentarkiv",
    nn: "Dokumentarkiv",
    en: "Documents",
    url: {
      nb: "https://www.nav.no/dokumentarkiv",
      nn: "https://www.nav.no/dokumentarkiv/nn",
      en: "https://www.nav.no/dokumentarkiv/en",
    }
  },
  {
    nb: "Siste utbetalinger",
    nn: "Siste utbetalingar",
    en: "Recent payments",
    url: {
      nb: "https://www.nav.no/utbetalingsoversikt",
      nn: "https://www.nav.no/utbetalingsoversikt",
      en: "https://www.nav.no/utbetalingsoversikt",
    }
  },
  {
    nb: "Svar og referater",
    nn: "Svar og referat",
    en: "Replies and summaries",
    url: {
      nb: "https://innboks.nav.no/",
      nn: "https://innboks.nav.no/",
      en: "https://innboks.nav.no/",
    }
  },
  {
    nb: "Søknad og skjema",
    nn: "Søknad og skjema",
    en: "Applications and forms",
    url: {
      nb: "https://www.nav.no/soknader",
      nn: "https://www.nav.no/soknader",
      en: "https://www.nav.no/soknader/en/person",
    }
  },
];

const annetLenkerDev = [
  {
    nb: "Pensjonskalkulator",
    nn: "Pensjonskalkulator",
    en: "Calculate pensions",
    url: {
      nb: "https://www.nav.no/pensjon/kalkulator/login",
      nn: "https://www.nav.no/pensjon/kalkulator/login",
      en: "https://www.nav.no/pensjon/kalkulator/login",
    }
  },
  {
    nb: "Dokumentarkiv",
    nn: "Dokumentarkiv",
    en: "Documents",
    url: {
      nb: "https://www.intern.dev.nav.no/dokumentarkiv",
      nn: "https://www.intern.dev.nav.no/dokumentarkiv/nn",
      en: "https://www.intern.dev.nav.no/dokumentarkiv/en",
    }
  },
  {
    nb: "Siste utbetalinger",
    nn: "Siste utbetalingar",
    en: "Recent payments",
    url: {
      nb: "https://www.intern.dev.nav.no/utbetalingsoversikt",
      nn: "https://www.intern.dev.nav.no/utbetalingsoversikt",
      en: "https://www.intern.dev.nav.no/utbetalingsoversikt",
    }
  },
  {
    nb: "Svar og referater",
    nn: "Svar og referat",
    en: "Replies and summaries",
    url: {
      nb: "https://innboks.nav.no/",
      nn: "https://innboks.nav.no/",
      en: "https://innboks.nav.no/",
    }
  },
  {
    nb: "Søknad og skjema",
    nn: "Søknad og skjema",
    en: "Applications and forms",
    url: {
      nb: "https://www.nav.no/soknader",
      nn: "https://www.nav.no/soknader",
      en: "https://www.nav.no/soknader/en/person",
    }
  },
];

const jobbLenkerConfig = {
  local: jobbLenkerDev,
  dev: jobbLenkerDev,
  prod: jobbLenkerProd,
};

const hjelpemidlerLenkerConfig = {
  local: hjelpemidlerLenkerDev,
  dev: hjelpemidlerLenkerDev,
  prod: hjelpemidlerLenkerProd,
};

const personopplysningLenkerConfig = {
  local: personopplysningLenkerDev,
  dev: personopplysningLenkerDev,
  prod: personopplysningLenkerProd,
};

const annetLenkerConfig = {
  local: annetLenkerDev,
  dev: annetLenkerDev,
  prod: annetLenkerProd,
};

export const jobbLenker = jobbLenkerConfig[getEnvironment()];
export const hjelpemidlerLenker = hjelpemidlerLenkerConfig[getEnvironment()];
export const personopplysningLenker = personopplysningLenkerConfig[getEnvironment()];
export const annetLenker = annetLenkerConfig[getEnvironment()];
