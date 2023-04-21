import React from "react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import { tidligereVarslerBaseUrl, tidligereVarslerManifestUrl } from "../urls";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import useStore, { selectIsError, selectLanguage } from "../store/store";
import { text } from "../language/text";
import Layout from "../components/layout/Layout";
import { useManifest } from "../hooks/useManifest";

const TidligereVarsler = () => {
  const [manifest, isLoadingManifest] = useManifest(tidligereVarslerManifestUrl);

  const language = useStore(selectLanguage);
  const isError = useStore(selectIsError);

  useBreadcrumbs([
    {
      url: `/minside/tidligere-varsler`,
      title: text.tidligereVarslinger[language],
      handleInApp: true,
    },
  ]);

  if (isLoadingManifest) {
    return <ContentLoader />;
  }

  const TidligereVarslerMikrofrotend = React.lazy(
    () => import(`${tidligereVarslerBaseUrl}/${manifest["src/Mikrofrontend.jsx"]["file"]}`)
  );

  return (
    <Layout isError={isError}>
      <React.Suspense fallback={<ContentLoader />}>
        <ErrorBoundary>
          <TidligereVarslerMikrofrotend />
        </ErrorBoundary>
      </React.Suspense>
    </Layout>
  );
};

export default TidligereVarsler;
