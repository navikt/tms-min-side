import React from "react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import useStore, { selectLanguage } from "../store/store";
import { text } from "../language/text";
import { setParams } from "@navikt/nav-dekoratoren-moduler";
import { varslerUrl } from "../urls";

const VarslerMikrofrontend = React.lazy(() => import(varslerUrl));

const Varlser = () => {
  const language = useStore(selectLanguage);

  useBreadcrumbs([
    {
      url: `/minside/varsler`,
      title: text.varsler[language],
      handleInApp: true,
    },
  ]);

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
