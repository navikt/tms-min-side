export type Language = "nb" | "nn" | "en";

const languages = {
  en: "English",
  nb: "Norsk bokmål",
  nn: "Norsk nynorsk",
};

const defaultLanguage = "nb";

export function getLanguage(url: URL) {
  const [_, base, language] = url.pathname.split("/");

  if (language in languages) {
    return language as Language;
  }

  return defaultLanguage as Language;
}
