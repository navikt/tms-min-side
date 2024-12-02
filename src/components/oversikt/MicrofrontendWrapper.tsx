import React from "react";
import ErrorBoundary from "@components/error-boundary/ErrorBoundary.tsx";
import { Skeleton } from "@navikt/ds-react";

const MicrofrontendWrapper = ({ manifestUrl }: { manifestUrl: string }) => {
  const Microfrontend = React.lazy(() => import(manifestUrl));

  return (
    <React.Suspense fallback={<Skeleton variant="rectangle" width={444} height={124} />}>
      <ErrorBoundary url={manifestUrl}>
        <Microfrontend />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default MicrofrontendWrapper;
