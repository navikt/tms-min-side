import { captureException } from "@nais/apm";
import type { PersonalizedContent } from "@src/features/din-oversikt/DinOversiktTypes";
import { fetcher, include } from "@src/shared/utils/client/api.ts";
import { logGroupedEvent, logMfEvent } from "@src/shared/utils/client/umami.ts";
import { useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { getProduktPropertiesLegacy, hasAktueltMicrofrontendsLegacy, hasMicrofrontendsLegacy } from "./legacyUtils";

export const useLogComposition = (url: string) => {
  const { data: personalizedContent, isLoading: isLoadingMicrofrontends } = useSWRImmutable<PersonalizedContent>(
    { path: url, options: include },
    fetcher,
    {
      onSuccess: (data) => data.microfrontends.map((mf) => logMfEvent(`minside.${mf.microfrontend_id}`, true)),
      onError: (error) => captureException(error, { fingerprint: "legacy-composition-fetch" }),
    },
  );

  useEffect(() => {
    if (personalizedContent && !isLoadingMicrofrontends) {
      const liste = [];
      const produktProperties = getProduktPropertiesLegacy("nb", personalizedContent);

      if (hasMicrofrontendsLegacy(personalizedContent?.microfrontends)) {
        personalizedContent.microfrontends.forEach((mf) => {
          liste.push(mf.microfrontend_id);
        });
      }

      if (hasAktueltMicrofrontendsLegacy(personalizedContent?.aktuelt)) {
        personalizedContent.aktuelt.forEach((mf) => {
          liste.push(`Aktuelt - ${mf.microfrontend_id}`);
        });
      }

      produktProperties?.forEach((produktkort) => {
        liste.push(`Produktkort - ${produktkort.tittel}`);
      });

      if (personalizedContent?.meldekort) {
        liste.push("meldekort");
      }

      liste.sort();
      logGroupedEvent(liste.toString());
    }
  }, [isLoadingMicrofrontends, personalizedContent]);
};
