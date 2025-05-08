import React from "react";
import ErrorBoundary from "../error-boundary/ErrorBoundary.tsx";
import { Skeleton } from "@navikt/ds-react";
import styles from "./MicrofrontendCSR.module.css";

const MicrofrontendCSR = ({ manifestUrl }: { manifestUrl: string }) => {
  const Microfrontend = React.lazy(() => import(manifestUrl));

  return (
    <React.Suspense fallback={<Skeleton variant="rectangle" width={444} height={124} />}>
      <ErrorBoundary url={manifestUrl}>
        <div className={styles.wrapper}>
          <Microfrontend />
        </div>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default MicrofrontendCSR;
