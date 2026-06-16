export type Locale = "nb" | "nn" | "en";

export function getLocale(currentLocale: string | undefined): Locale {
  return (currentLocale ?? "nb") as Locale;
}
