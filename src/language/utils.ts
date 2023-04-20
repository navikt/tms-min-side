import { baseUrlWithLanguage } from "../urls";

export const getLanguageFromUrl = () => {
  const currentUrl = window.location.href.toLowerCase();

  if (currentUrl.includes(baseUrlWithLanguage.en)) {
    return "en";
  } else if (currentUrl.includes(baseUrlWithLanguage.nn)) {
    return "nn";
  } else {
    return "nb";
  }
};
