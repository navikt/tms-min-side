import React from "react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import { utkastBaseUrl, utkastManifestUrl } from "../urls";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import useStore, { selectLanguage } from "../store/store";
import { text } from "../language/text";
import { setParams } from "@navikt/nav-dekoratoren-moduler";
import { useManifest } from "../hooks/useManifest";

const Utkast = () => {
  const [manifest, isLoadingManifest] = useManifest(utkastManifestUrl);
  const language = useStore(selectLanguage);

  useBreadcrumbs([
    {
      url: `/minside/utkast`,
      title: text.utkast[language],
      handleInApp: true,
    },
  ]);

  setParams({
    utilsBackground: "white",
  });

  if (isLoadingManifest) {
    return <ContentLoader />;
  }

  const UtkastMikrofrontend = React.lazy(() => import(`${utkastBaseUrl}/${manifest["src/Mikrofrontend.tsx"]["file"]}`));

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <UtkastMikrofrontend />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default Utkast;
