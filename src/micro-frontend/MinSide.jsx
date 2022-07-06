import React from "react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import { minSideTjenesterUrl, minSideOversiktUrl, arbeidsflateForInnlogetArbeidssokerUrl } from "../urls";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";

const MinSideTjenester = React.lazy(() => import(minSideTjenesterUrl));
const ArbeidsflateForInnlogetArbeidssoker = React.lazy(() => import(arbeidsflateForInnlogetArbeidssokerUrl));
const MinSideOversikt = React.lazy(() => import(minSideOversiktUrl));

const MinSide = () => {
  useBreadcrumbs();

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <h1>Test</h1>
    </React.Suspense>
  );
};

export default MinSide;
