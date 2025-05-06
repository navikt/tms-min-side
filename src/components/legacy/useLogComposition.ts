import { useEffect } from "react";
import { logGroupedEvent, logMfEvent } from "../../utils/client/amplitude.ts";
import { PersonalizedContent } from "../din-oversikt/microfrontendTypes.tsx";
import useSWRImmutable from "swr/immutable";
import { fetcher, include } from "../../utils/client/api.ts";
import { dinOversiktLegacyUrl } from "./urls";
import { getProduktPropertiesLegacy, hasAktueltMicrofrontendsLegacy, hasMicrofrontendsLegacy } from "./utils";

export const useLogComposition = () => {
  const { data: personalizedContent, isLoading: isLoadingMicrofrontends } = useSWRImmutable<PersonalizedContent>(
    { path: dinOversiktLegacyUrl, options: include },
    fetcher,
    {
      onSuccess: (data) => data.microfrontends.map((mf) => logMfEvent(`minside.${mf.microfrontend_id}`, true)),
    },
  );

  useEffect(() => {
    if (personalizedContent && !isLoadingMicrofrontends) {
      let liste = [];
      const produktProperties = getProduktPropertiesLegacy("nb", personalizedContent);

      if (hasMicrofrontendsLegacy(personalizedContent?.microfrontends)) {
        personalizedContent?.microfrontends?.map((mf) => liste.push(mf.microfrontend_id));
      }

      if (hasAktueltMicrofrontendsLegacy(personalizedContent?.aktuelt)) {
        personalizedContent?.aktuelt?.map((mf) => liste.push("Aktuelt - " + mf.microfrontend_id));
      }

      produktProperties?.map((produktkort) => liste.push("Produktkort - " + produktkort.tittel));

      if (personalizedContent?.meldekort) {
        liste.push("meldekort");
      }

      liste.sort();
      logGroupedEvent(liste.toString());
    }
  }, [!isLoadingMicrofrontends]);
};
