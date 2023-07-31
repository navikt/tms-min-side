import React, { useEffect } from "react";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import ContentLoader from "../../components/loader/ContentLoader";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import { useLanguage } from "../../hooks/useLanguage";
import { useManifest } from "../../hooks/useManifest";
import { postInnloggingsstatistikk } from "../../utils/api.client";
import { bundle, oversiktEntry } from "../entrypoints";
import { oversiktCdnUrl, oversiktManifestUrl } from "./urls";
import type { Props } from "../types";
import { useSentry } from "../../hooks/useSentry";

const MinSide = ({ language }: Props) => {
  const [oversiktManifest, isLoadingOversiktManifest] = useManifest(oversiktManifestUrl);
  useLanguage(language);
  useBreadcrumbs([], language);
  useSentry();

  useEffect(() => {
    postInnloggingsstatistikk();
  }, []);

  if (isLoadingOversiktManifest) {
    return <ContentLoader />;
  }

  const Oversikt = React.lazy(() => import(`${oversiktCdnUrl}/${oversiktManifest[oversiktEntry][bundle]}`));

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <Oversikt />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default MinSide;
