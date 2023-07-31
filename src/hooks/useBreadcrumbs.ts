import { useEffect } from "react";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { text } from "../language/text";
import type { Language } from "../language/language";

type Breadcrumb = {
  url: string;
  title: string;
  handleInApp?: boolean;
};

export const useBreadcrumbs = (breadcrumb: Breadcrumb[], language: Language) => {
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
  }, []);
};
