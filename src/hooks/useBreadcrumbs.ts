import { useEffect } from "react";
import { onBreadcrumbClick, setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import useStore, { selectLanguage } from "../store/store";
import { useNavigate } from "react-router";
import { text } from "../language/text";
import { Locale } from "./useLanguage";

type Breadcrumb = {
  url: string;
  title: string;
  handleInApp?: boolean;
};

export const useBreadcrumbs = (breadcrumb: Breadcrumb[]) => {
  const language: Locale = useStore(selectLanguage);
  const navigate = useNavigate();

  onBreadcrumbClick((breadcrumb) => {
    navigate(breadcrumb.url);
  });

  useEffect(() => {
    const baseBreadcrumbs: Breadcrumb[] = [
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
