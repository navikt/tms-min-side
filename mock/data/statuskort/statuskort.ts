import type { StatuskortResponse } from "@src/features/din-oversikt/statuskort/StatuskortTypes";
import type { Locale } from "@src/shared/utils/server/locale";
import { aap, dagpenger } from "./content";

const locales: Locale[] = ["nb", "nn", "en"];

const resolveLocale = (locale?: string): Locale => locales.find((valid) => valid === locale?.toLowerCase()) ?? "nb";

export const Statuskort = (locale?: string): StatuskortResponse => {
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
        tjeneste: "dagpenger",
        innhold: {
          tittel: dagpenger.tittel[valgtLocale],
          beskrivelse: dagpenger.beskrivelse[valgtLocale],
          link: "https://www.nav.no/dagpenger",
        },
      },
    ],
    harSkjulteKort: false,
  };
};
