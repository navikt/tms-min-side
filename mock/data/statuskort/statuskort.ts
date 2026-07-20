import type { Locale } from "@src/shared/utils/server/locale";
import { beskrivelse, tittel } from "./content";

export const Statuskort = (locale: Locale) => {
  return {
    statuskort: [
      {
        id: "a3f1c2d4-5e6f-4a7b-8c9d-0e1f2a3b4c5d",
        tjeneste: "AAP",
        link: "https://www.nav.no/aap",
        tittel: tittel[locale],
        beskrivelse: beskrivelse[locale],
      },
      {
        id: "b4e2d3c5-6f7a-4b8c-9d0e-1f2a3b4c5d6e",
        tjeneste: "Dagpenger",
        link: "https://www.nav.no/dagpenger",
        tittel: tittel[locale],
        beskrivelse: beskrivelse[locale],
      },
    ],
  };
};
