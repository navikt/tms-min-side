import React from "react";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import ContentLoader from "../../components/loader/ContentLoader";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import { useLanguage } from "../../hooks/useLanguage";
import { useManifest } from "../../hooks/useManifest";
import { text } from "../../language/text";
import { bundle, tidligereVarslerEntry } from "../entrypoints";
import { tidligereVarslerManifestUrl, tidligereVarslerUrl } from "./urls";
import type { Props } from "../types";

const TidligereVarsler = ({ language }: Props) => {
  const [manifest, isLoadingManifest] = useManifest(tidligereVarslerManifestUrl);

  useLanguage(language);
  useBreadcrumbs(
    [
      {
        url: `/minside/tidligere-varsler`,
        title: text.tidligereVarslinger[language],
        handleInApp: true,
      },
    ],
    language
  );

  if (isLoadingManifest) {
    return <ContentLoader />;
  }

  const TidligereVarslerMikrofrotend = React.lazy(
    () => import(`${tidligereVarslerUrl}/${manifest[tidligereVarslerEntry][bundle]}`)
  );

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <TidligereVarslerMikrofrotend />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default TidligereVarsler;
