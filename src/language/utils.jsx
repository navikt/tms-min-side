import Cookies from "js-cookie";

const hasLanguage = (language) => {
  return typeof language !== "undefined";
};

const hasAvailableLanguage = (language) => {
  if (!hasLanguage(language)) {
    return false;
  }

  return language.includes("nb") || language.includes("en");
};

export const getLanguageFromCookie = () => {
  const language = Cookies.get("decorator-language");

  return hasAvailableLanguage(language) ? language : "nb";
};
