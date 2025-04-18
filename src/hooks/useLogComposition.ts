import { useEffect } from "react";
import { hasMicrofrontends, hasAktueltMicrofrontends } from "@utils/client/oversikt.ts";
import { logGroupedEvent, logMfEvent } from "@utils/client/amplitude.ts";
import { PersonalizedContent } from "@components/oversikt/microfrontendTypes.tsx";
import useSWRImmutable from "swr/immutable";
import { dinOversiktUrl } from "@components/oversikt/urls.ts";
import { fetcher, include } from "@utils/client/api.ts";
import { setIsError } from "../store/store.ts";
import ProduktProperties from "@components/oversikt/produktkort/ProduktProperties.tsx";

export const useLogComposition = (produktProperties?: ProduktProperties[]) => {
  const {
    data: personalizedContent,
    isLoading: isLoadingMicrofrontends
  } = useSWRImmutable<PersonalizedContent>({ path: dinOversiktUrl, options: include }, fetcher, {
      onError: () => setIsError(),
      onSuccess: (data) => data.microfrontends.map((mf) => logMfEvent(`minside.${mf.microfrontend_id}`, true))
    }
  );

  useEffect(() => {
    if (personalizedContent && !isLoadingMicrofrontends) {
      let liste = [];

      if (hasMicrofrontends(personalizedContent?.microfrontends)) {
        personalizedContent?.microfrontends?.map((mf) => liste.push(mf.microfrontend_id));
      }

      if (hasAktueltMicrofrontends(personalizedContent?.aktuelt)) {
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
