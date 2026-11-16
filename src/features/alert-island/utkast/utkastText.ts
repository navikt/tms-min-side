export const text = {
  utkastTitle: {
    nb: "Utkast",
    nn: "Utkast",
    en: "Drafts",
  },
  utkast: {
    nb: "En påbegynt utkast",
    nn: "Du har starta på ein utkast",
    en: "One started drafts",
  },
  flereUtkast: {
    nb: (antall: number) => `Du har ${antall} påbegynte utkast`,
    nn: (antall: number) => `Du har starta på ${antall} utkast`,
    en: (antall: number) => `you have started on ${antall} drafts`,
  },
};
