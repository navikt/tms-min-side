import React from "react";
import ContentLoader from "@components/loader/ContentLoader.tsx";
import ErrorBoundary from "@components/error-boundary/ErrorBoundary.tsx";
import type { Props } from "../types.ts";
import useSWRImmutable from "swr/immutable";
import { aiaMeldekortUrl } from "./urls.ts";
import { fetcher } from "@utils/api.client.ts";
import { useLanguage } from "@hooks/useLanguage.ts";
import { bundle, entry } from "../entrypoints.ts";

const Bekreftelse = ({ language }: Props) => {
  const { data: manifest, isLoading: isLoadingManifest } = useSWRImmutable({ path: `${aiaMeldekortUrl}/dist/.vite/manifest.json` }, fetcher);
  useLanguage(language);

  if (isLoadingManifest) {
    return <ContentLoader />;
  }

  const AiaMeldekort = React.lazy(() => import(`${aiaMeldekortUrl}/dist/${manifest[entry][bundle]}`));

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <AiaMeldekort />
      </ErrorBoundary>
    </React.Suspense>
  );
}

export default Bekreftelse;
