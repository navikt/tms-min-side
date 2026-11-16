export const text = {
  utkast: {
    nb: "Utkast",
    nn: "Utkast",
    en: "Drafts",
  },
  soknad: {
    nb: "En påbegynt utkast",
    nn: "Du har starta på ein utkast",
    en: "One started drafts",
  },
  soknader: {
    nb: (antall: number) => `Du har ${antall} påbegynte utkast`,
    nn: (antall: number) => `Du har starta på ${antall} utkast`,
    en: (antall: number) => `you have started on ${antall} drafts`,
  },
};
