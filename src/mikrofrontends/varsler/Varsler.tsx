import { setParams } from "@navikt/nav-dekoratoren-moduler";
import React from "react";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import ContentLoader from "../../components/loader/ContentLoader";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import { useLanguage } from "../../hooks/useLanguage";
import { text } from "../../language/text";
import { varslerUrl } from "./urls";
import type { Props } from "../types";

const VarslerMikrofrontend = React.lazy(() => import(varslerUrl));

const Varlser = ({ language }: Props) => {
  useLanguage(language);
  useBreadcrumbs(
    [
      {
        url: `/minside/varsler`,
        title: text.varsler[language],
        handleInApp: true,
      },
    ],
    language
  );

  setParams({
    utilsBackground: "white",
  });

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <VarslerMikrofrontend />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default Varlser;
