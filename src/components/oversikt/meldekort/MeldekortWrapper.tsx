import React from "react";
import { meldekortUrl } from "../urls";
import ErrorBoundary from "@components/error-boundary/ErrorBoundary.tsx";

const MeldekortWrapper = () => {
  const Meldekort = React.lazy(() => import(meldekortUrl));
  return (
    <React.Suspense fallback={null}>
      <ErrorBoundary>
        <Meldekort />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default MeldekortWrapper;
