import { useEffect } from "react";
import { hasMicrofrontends } from "@utils/oversikt.ts";
import { logGroupedEvent, logMfEvent } from "@utils/amplitude.ts";
import { PersonalizedContent } from "@components/oversikt/microfrontendTypes.tsx";
import useSWRImmutable from "swr/immutable";
import { microfrontendsUrl } from "@components/oversikt/urls.ts";
import { fetcher, include } from "@utils/api.client.ts";
import { setIsError } from "../store/store.ts";
import ProduktProperties from "@components/oversikt/produktkort/ProduktProperties.tsx";

export const useLogComposition = (produktProperties?: ProduktProperties[]) => {
  const {
    data: personalizedContent,
    isLoading: isLoadingMicrofrontends
  } = useSWRImmutable<PersonalizedContent>({ path: microfrontendsUrl, options: include }, fetcher, {
      onError: () => setIsError(),
      onSuccess: (data) => data.microfrontends.map((mf) => logMfEvent(`minside.${mf.microfrontend_id}`, true))
    }
  );

  useEffect(() => {
    if (!isLoadingMicrofrontends) {
      let liste = [];

      if (hasMicrofrontends(personalizedContent)) {
        personalizedContent?.microfrontends?.map((mf) => liste.push(mf.microfrontend_id));
      }

      produktProperties?.map((produktkort) => liste.push("Produktkort - " + produktkort.tittel));

      if (personalizedContent?.meldekort) {
        liste.push("meldekort");
      }
      if (personalizedContent?.aiaStandard) {
        liste.push("AiA-standard");
      }
      if (personalizedContent?.oppfolgingContent) {
        liste.push("Aktivitetsplan");
        liste.push("Dialog med veileder");
      }

      liste.sort();
      logGroupedEvent(liste.toString());
    }
  }, [!isLoadingMicrofrontends]);

};
