import { setParams } from "@navikt/nav-dekoratoren-moduler";
import React from "react";
import ErrorBoundary from "@components/error-boundary/ErrorBoundary";
import ContentLoader from "@components/loader/ContentLoader";
import { useLanguage } from "@hooks/useLanguage.ts";
import { bundle, entry } from "../entrypoints";
import { utkastManifestUrl, utkastUrl } from "./urls";
import type { Props } from "../types";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@utils/api.client.ts";

const Utkast = ({ language }: Props) => {
  const { data: manifest, isLoading: isLoadingManifest } = useSWRImmutable({ path: utkastManifestUrl }, fetcher);
  useLanguage(language);

  if (isLoadingManifest) {
    return <ContentLoader />;
  }

  setParams({
    utilsBackground: "gray",
  });

  const UtkastMikrofrontend = React.lazy(() => import(`${utkastUrl}/${manifest[entry][bundle]}`));

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <UtkastMikrofrontend />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default Utkast;
