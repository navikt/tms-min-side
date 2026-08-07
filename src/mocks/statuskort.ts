import type { MockDefinition } from "@navikt/astro-mocks";
import type { StatuskortResponse } from "@src/features/din-oversikt/statuskort/StatuskortTypes";
import type { Locale } from "@src/shared/utils/server/locale";

interface Tekster {
  tittel: Record<Locale, string>;
  beskrivelse: Record<Locale, string>;
}

const aap: Tekster = {
  tittel: {
    nb: "Arbeidsavklaringspenger",
    nn: "Arbeidsavklaringspengar",
    en: "Work assessment allowance",
  },
  beskrivelse: {
    nb: "Vi behandler søknaden din",
    nn: "Vi behandlar søknaden din",
    en: "We are processing your application",
  },
};

const tilleggsstonader: Tekster = {
  tittel: {
    nb: "Tilleggsstønader",
    nn: "Tilleggsstønader",
    en: "Supplementary benefits",
  },
  beskrivelse: {
    nb: "Du har en aktiv sak",
    nn: "Du har ei aktiv sak",
    en: "You have an active case",
  },
};

const locales: Locale[] = ["nb", "nn", "en"];

const resolveLocale = (locale?: string): Locale => locales.find((valid) => valid === locale?.toLowerCase()) ?? "nb";

const statuskort = (locale?: string): StatuskortResponse => {
  const valgtLocale = resolveLocale(locale);

  return {
    statuskort: [
      {
        id: "a3f1c2d4-5e6f-4a7b-8c9d-0e1f2a3b4c5d",
        tjeneste: "aap",
        innhold: {
          tittel: aap.tittel[valgtLocale],
          beskrivelse: aap.beskrivelse[valgtLocale],
          link: "https://www.nav.no/aap",
        },
      },
      {
        id: "b4e2d3c5-6f7a-4b8c-9d0e-1f2a3b4c5d6e",
        tjeneste: "tilleggsstonader",
        innhold: {
          tittel: tilleggsstonader.tittel[valgtLocale],
          beskrivelse: tilleggsstonader.beskrivelse[valgtLocale],
          link: "https://www.nav.no/tilleggsstonader",
        },
      },
    ],
    harSkjulteKort: false,
  };
};

export const statuskortMocks: MockDefinition[] = [
  {
    path: "/statuskort",
    handler: ({ query }) => statuskort(query.get("locale") ?? undefined),
  },
];
