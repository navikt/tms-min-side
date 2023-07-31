import React from "react";
import ContentLoader from "../../components/loader/ContentLoader";
import { aiaCdnUrl, aiaManifestUrl } from "./urls";
import { aiaEntry, bundle } from "../entrypoints";
import { useManifest } from "../../hooks/useManifest";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import { text } from "../../language/text";
import { useLanguage } from "../../hooks/useLanguage";
import type { Props } from "../types";

const Arbeidssoker = ({ language }: Props) => {
  const [manifest, isLoading] = useManifest(aiaManifestUrl);

  useLanguage(language);
  useBreadcrumbs(
    [
      {
        url: `/minside/arbeidssoker`,
        title: text.arbeidssoker[language],
        handleInApp: true,
      },
    ],
    language
  );

  if (isLoading) {
    return <ContentLoader />;
  }

  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(() => import(`${aiaCdnUrl}/${manifest[aiaEntry][bundle]}`));

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <ArbeidsflateForInnloggetArbeidssoker />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default Arbeidssoker;
