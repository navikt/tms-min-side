import { setParams } from "@navikt/nav-dekoratoren-moduler";
import React from "react";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import ContentLoader from "../../components/loader/ContentLoader";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import { useLanguage } from "../../hooks/useLanguage";
import { text } from "../../language/text";
import { bundle, entry } from "../entrypoints";
import { utkastManifestUrl, utkastUrl } from "./urls";
import type { Props } from "../types";
import { useManifest } from "../../hooks/useManifest";

const Utkast = ({ language }: Props) => {
  const [manifest, isLoadingManifest] = useManifest(utkastManifestUrl);
  const UtkastMikrofrontend = React.lazy(() => import(`${utkastUrl}/${manifest[entry][bundle]}`));

  useLanguage(language);
  useBreadcrumbs(
    [
      {
        url: `/minside/utkast`,
        title: text.utkast[language],
        handleInApp: true,
      },
    ],
    language
  );

  if (isLoadingManifest) {
    return <ContentLoader />;
  }

  setParams({
    utilsBackground: "white",
  });

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <UtkastMikrofrontend />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default Utkast;
