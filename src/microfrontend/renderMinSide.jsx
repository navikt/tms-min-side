import React from "react";
import ErrorBoundary from "../components/errorboundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import { createNanoEvents } from "nanoevents";
import { useQuery } from "react-query";
import { minSideProxyUrl } from "../urls";
import { fetcher } from "../api/api";

export const renderMinSide = (MinSideTopp, MinSideBunn) => {
  const { data: status, isLoading } = useQuery(`${minSideProxyUrl}/login/status`, fetcher);
  const emitter = createNanoEvents();

  if (!isLoading) {
    emitter.on("loaded", () => {
      emitter.emit("level", status.level);
    });
  }

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <MinSideTopp emitter={emitter} />
      </ErrorBoundary>
      <ErrorBoundary>
        <MinSideBunn emitter={emitter} />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default renderMinSide;
