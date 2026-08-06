import type { Locale } from "@src/shared/utils/server/locale";

interface Tekster {
  tittel: Record<Locale, string>;
  beskrivelse: Record<Locale, string>;
}

export const aap: Tekster = {
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

export const tilleggsstonader: Tekster = {
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
