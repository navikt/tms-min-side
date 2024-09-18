export const text = {
  varsel: {
    nb: "Varsler",
    nn: "Varsler",
    en: "Notification",
  },
  varselIngressOppgaveEntall: {
    nb: (antallOppgaver: number) => `${antallOppgaver} oppgave`,
    nn: (antallOppgaver: number) => `${antallOppgaver} oppgåve`,
    en: (antallOppgaver: number) => `${antallOppgaver} task`,
  },
  varselIngressOppgaveFlertall: {
    nb: (antallOppgaver: number) => `${antallOppgaver} oppgaver`,
    nn: (antallOppgaver: number) => `${antallOppgaver} oppgåver`,
    en: (antallOppgaver: number) => `${antallOppgaver} tasks`,
  },
  varselIngressBeskjedEntall: {
    nb: (antallBeskjeder: number) => `${antallBeskjeder} beskjed`,
    nn: (antallBeskjeder: number) => `${antallBeskjeder} beskjed`,
    en: (antallBeskjeder: number) => `${antallBeskjeder} message`,
  },
  varselIngressBeskjedFlertall: {
    nb: (antallBeskjeder: number) => `${antallBeskjeder} beskjeder`,
    nn: (antallBeskjeder: number) => `${antallBeskjeder} beskjeder`,
    en: (antallBeskjeder: number) => `${antallBeskjeder} messages`,
  },
  varselOppgaverOgBeskjeder: {
    nb: " og ",
    nn: " og ",
    en: " and ",
  },
  varselIngressIngenVarsler: {
    nb: "Ingen varsler",
    nn: "Ingen varsel",
    en: "No notifications",
  },
  utkastTittel: {
    nb: "Utkast",
    nn: "Utkast",
    en: "Drafts",
  },
  utkastIngressEntall: {
    nb: "En påbegynt søknad",
    nn: "Ein søknad du har starta på",
    en: "One started application",
  },
  utkastIngressFlertall: {
    nb: (antall: number) => `${antall} påbegynte søknader`,
    nn: (antall: number) => `${antall} søknadar du har starta på`,
    en: (antall: number) => `${antall} started applications`,
  },
  sidetittelVelkomsthilsen: {
    nb: "Hei, ",
    nn: "Hei, ",
    en: "Hi, ",
  },
  sidetittelVelkomsthilsenMorgen: {
    nb: "God morgen, ",
    nn: "God morgon, ",
    en: "Good morning, ",
  },
  sidetittelVelkomsthilsenKveld: {
    nb: "God kveld, ",
    nn: "God kveld, ",
    en: "Good evening, ",
  },
  loaderTekst: {
    nb: "Laster...",
    nn: "Lastar...",
    en: "Loading...",
  },
  feilmelding: {
    nb: "Vi har for øyeblikket tekniske problemer. Dette kan føre til at du ikke får opp all informasjon. Vennligst prøv igjen senere.",
    en: "We're having technical difficulties. Some information may not be available, please try again later.",
    nn: "Vi har for øyeblikket tekniske problemer. Dette kan føre til at du ikke får opp all informasjon. Vennligst prøv igjen senere.",
  },
  sisteSakerTittel: {
    nb: "Dokumentarkiv",
    nn: "Dokumentarkiv",
    en: "Document archive",
  },
  ingenDokumenter: {
    nb: "Foreløpig ingen dokumenter å vise",
    nn: "Førebels ingen dokument å vise",
    en: "Currently no documents to show",
  },
  sisteSakerLenketekst: {
    nb: "Se alle dine saker",
    nn: "Sjå alle sakane dine",
    en: "All my cases",
  },
  sisteSakerLenkedetail: {
    nb: "Sist endret: ",
    nn: "Sist endret: ",
    en: "Last updated: ",
  },
  seAlle: {
    nb: "Se alle",
    nn: "Sjå alle",
    en: "See all",
  },
  kommunikasjonsFlisTittel: {
    nb: "Kommunikasjon med NAV",
    nn: "Kommunikasjon med NAV",
    en: "Communication with NAV",
  },
  kommunikasjonsFlisLenketekstDialog: {
    nb: "Dialog med veilederen din",
    nn: "Dialog med rettleiaren din",
    en: "Dialogue with your advisor",
  },
  kommunikasjonsFlisIngressDialog: {
    nb: "Du som får arbeidsoppfølging kan kontakte veilederen din her om oppfølging, for eksempel avtalte møter, aktiviteter og tiltak.",
    nn: "Du som får arbeidsoppfølging kan kontakta rettleiaren din her om oppfølging, til dømes avtalte møter, aktivitetar og tiltak.",
    en: "Since you receive continued employment guidance, you can contact your advisor here for advice, for example regarding agreed meetings, activities and measures.",
  },
  kommunikasjonsFlisLenketekstBrevOgVedtak: {
    nb: "Brev og vedtak",
    nn: "Brev og vedtak",
    en: "Letters and decisions",
  },
  kommunikasjonsFlisIngressBrevOgVedtak: {
    nb: "For deg som ikke har Digipost eller e-Boks.",
    nn: "For deg som ikkje har Digipost eller e-Boks.",
    en: "If you don’t have Digipost or e-Boks.",
  },
  aktivitetsplanTittel: {
    nb: "Aktivitetsplan",
    nn: "Aktivitetsplan",
    en: "Activities Plan",
  },
  aktivitetsplanIngress: {
    nb: "I aktivitetsplanen holder du oversikt over det du gjør for å komme i jobb eller annen aktivitet.",
    nn: "I aktivitetsplanen held du oversikt over kva du gjer for å komme i jobb eller annan aktivitet.",
    en: "The Activities Plan provides an overview of the activities you are doing to find work or another activity.",
  },
  generelleFliserSykefravaer: {
    nb: "Ditt sykefravær",
    nn: "Ditt sjukefråvær",
    en: "My absences due to sickness",
  },
  generelleFliserMistetJobb: {
    nb: "Mistet jobben?",
    nn: "Mista jobben?",
    en: "Lost your job?",
  },
  generelleFliserSkjemaer: {
    nb: "Skjemaer",
    nn: "Skjema",
    en: "Forms",
  },
  generelleFliserPensjon: {
    nb: "Din pensjon",
    nn: "Din pensjon",
    en: "My pension",
  },
  ledigeStillinger: {
    nb: "Ledige stillinger",
    nn: "Ledige stillinger",
    en: "Job listings",
  },
  uforetrygd: {
    nb: "Uføretrygd",
    nn: "Uføretrygd",
    en: "Disability benefit",
  },
  dineForeldrepenger: {
    nb: "Dine foreldrepenger",
    nn: "Dine foreldrepenger",
    en: "My parental benefit",
  },
  aktivitetsplan: {
    nb: "Aktivitetsplan",
    nn: "Aktivitetsplan",
    en: "Activity plan",
  },
  meldekort: {
    nb: "Meldekort",
    nn: "Meldekort",
    en: "Employment status form",
  },
  personopplysninger: {
    nb: "Personopplysninger",
    nn: "Personopplysninger",
    en: "Personal data",
  },
  skjemaer: {
    nb: "Skjemaer",
    nn: "Skjema",
    en: "Forms",
  },
  dinPensjon: {
    nb: "Din pensjon",
    nn: "Din pensjon",
    en: "My pension",
  },
  dineStillingssok: {
    nb: "Dine stillingssøk",
    nn: "Dine stillingssøk",
    en: "My job searches",
  },
  veilederArbeidssoker: {
    nb: "Veileder for arbeidssøker",
    nn: "Rettleiar for arbeidssøkar",
    en: "Guide for job seekers",
  },
  registrerDegSomArbeidssoker: {
    nb: "Registrer deg som arbeidssøker",
    nn: "Registrer deg som arbeidssøkar",
    en: "Register as a job seeker",
  },
  sosialhjelp: {
    nb: "Økonomisk sosialhjelp",
    nn: "Økonomisk sosialhjelp",
    en: "Financial assistance",
  },
  dineFullmakter: {
    nb: "Dine fullmakter",
    nn: "Dine fullmakter",
    en: "My authorizations",
  },
  dinePleiepenger: {
    nb: "Dine pleiepenger",
    nn: "Dine pleiepengar",
    en: "My attendance allowance",
  },
  dittSykefravaer: {
    nb: "Ditt sykefravær",
    nn: "Ditt sjukefravær",
    en: "My absences due to sickness",
  },
  hjelpemidler: {
    nb: "Hjelpemidler",
    nn: "Hjelpemiddel",
    en: "Assistive technology",
  },
  arbeidsavklaringspenger: {
    nb: "Arbeidsavklaringspenger",
    nn: "Arbeidsavklaringspengar",
    en: "Work assessment allowance",
  },
  uxTweakTittel: {
    nb: "Vil du bli med på en enkel test av Min side?",
    nn: "Vil du bli med på en enkel test av Min side?",
    en: "Vil du bli med på en enkel test av Min side?",
  },
  uxTweakIngress1: {
    nb: "Vi vil gjerne vite om innholdet vårt er forståelig og organisert på en logisk måte. Derfor har vi satt opp en enkel prototype vi ønsker å teste. Prototypen er klikkbare skisser av hvordan Min side kan bli.",
    nn: "Vi vil gjerne vite om innholdet vårt er forståelig og organisert på en logisk måte. Derfor har vi satt opp en enkel prototype vi ønsker å teste. Prototypen er klikkbare skisser av hvordan Min side kan bli.",
    en: "Vi vil gjerne vite om innholdet vårt er forståelig og organisert på en logisk måte. Derfor har vi satt opp en enkel prototype vi ønsker å teste. Prototypen er klikkbare skisser av hvordan Min side kan bli.",
  },
  uxTweakIngress2: {
    nb: "Testen åpnes i en ny fane (i et program som heter UXtweak) og tar maks 5 minutter. Du er anonym. Svarene du gir vil ikke kunne knyttes til deg, eller påvirke en eventuell sak du har hos NAV.",
    nn: "Testen åpnes i en ny fane (i et program som heter UXtweak) og tar maks 5 minutter. Du er anonym. Svarene du gir vil ikke kunne knyttes til deg, eller påvirke en eventuell sak du har hos NAV.",
    en: "Testen åpnes i en ny fane (i et program som heter UXtweak) og tar maks 5 minutter. Du er anonym. Svarene du gir vil ikke kunne knyttes til deg, eller påvirke en eventuell sak du har hos NAV.",
  },
  uxTweakLenketekst: {
    nb: "Ja, jeg vil teste",
    nn: "Ja, jeg vil teste",
    en: "Ja, jeg vil teste",
  },
  aktivitetsplanId: {
    nb: "Aktivitetsplan",
    nn: "Aktivitetsplan",
    en: "Aktivitetsplan",
  },
  dagpenger: {
    nb: "Dagpenger",
    nn: "Dagpengar",
    en: "Dagpenger",
  },
};
