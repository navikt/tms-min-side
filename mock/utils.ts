export type Locale = "nb" | "nn" | "en";

const supportedLocales: Locale[] = ["nb", "nn", "en"];

export function resolveLocale(locale: string | undefined): Locale {
  return supportedLocales.includes(locale as Locale) ? (locale as Locale) : "nb";
}
