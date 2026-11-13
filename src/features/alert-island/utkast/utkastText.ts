export const text = {
  utkast: {
    nb: "Utkast",
    nn: "Utkast",
    en: "Drafts",
  },
  soknad: {
    nb: "En påbegynt søknad",
    nn: "Du har starta på ein søknad",
    en: "One started application",
  },
  soknader: {
    nb: (antall: number) => `Du har ${antall} påbegynte utkast`,
    nn: (antall: number) => `Du har starta på ${antall} utkast`,
    en: (antall: number) => `you have started on ${antall} drafts`,
  },
};
