import { useEffect } from "react";
import { onLanguageSelect, setAvailableLanguages, setParams, DecoratorLocale } from "@navikt/nav-dekoratoren-moduler";
import type { Language } from "@language/language";

export const setSessionLanguage = (language: DecoratorLocale) => {
  window.sessionStorage.setItem("language", language);
};

export const useLanguage = (language: Language) => {
  const [_leadingSlash, _basePath, _oldLocale, ...rest] = window.location.pathname.split("/");
  const slug = rest.join("/");
  setSessionLanguage(language);

  onLanguageSelect((language) => {
    setSessionLanguage(language.locale);
    window.location.pathname = `/minside/${language.locale}/${slug}`;
  });

  useEffect(() => {
    setParams({ language: language });
    setAvailableLanguages([
      {
        locale: "nb",
        handleInApp: true,
      },
      {
        locale: "en",
        handleInApp: true,
      },
      {
        locale: "nn",
        handleInApp: true,
      },
    ]);
  }, []);
};
