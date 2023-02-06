import { useEffect } from "react";
import { onBreadcrumbClick, setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import useStore, { selectLanguage } from "../store/store";
import { useNavigate } from "react-router";
import { text } from "../language/text";
import { logEvent } from "../amplitude/amplitude";

export const useBreadcrumbs = (breadcrumb = []) => {
  const language = useStore(selectLanguage);
  const navigate = useNavigate();

  onBreadcrumbClick((breadcrumb) => {
    logEvent("navigere", breadcrumb.title);
    navigate(breadcrumb.url);
  });

  useEffect(() => {
    const baseBreadcrumbs = [
      {
        url: "/minside",
        title: text.minSide[language],
        handleInApp: false,
      },
    ];

    const breadcrumbs = baseBreadcrumbs.concat(breadcrumb);
    setBreadcrumbs(breadcrumbs);
  }, [language]);
};
