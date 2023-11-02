import { setParams } from "@navikt/nav-dekoratoren-moduler";
import React from "react";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import ContentLoader from "../../components/loader/ContentLoader";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import { useLanguage } from "../../hooks/useLanguage";
import { text } from "@language/text.ts";
import { varslerCdnUrl, varslerManifestUrl } from "./urls";
import type { Props } from "../types";
import { bundle, entry } from "../entrypoints.ts";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@utils/api.client.ts";

const Varlser = ({ language }: Props) => {
  const { data: manifest, isLoading: isLoadingManifest } = useSWRImmutable({ path: varslerManifestUrl }, fetcher);

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

  if (isLoadingManifest){
    return <ContentLoader />;
  }

  const VarslerMikrofrontend = React.lazy(() => import(`${varslerCdnUrl}/${manifest[entry][bundle]}`));

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <VarslerMikrofrontend />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default Varlser;
