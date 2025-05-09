import React from "react";
import ErrorBoundary from "@components/error-boundary/ErrorBoundary.tsx";
import { meldekortUrl } from "./urls";

const MeldekortWrapper = () => {
  const Meldekort = React.lazy(() => import(meldekortUrl));
  return (
    <React.Suspense fallback={null}>
      <ErrorBoundary url={meldekortUrl}>
        <Meldekort />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default MeldekortWrapper;
