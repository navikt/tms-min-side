import { BodyShort } from "@navikt/ds-react";
import { useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { arbeidssokerUrl, meldekortApiUrl, microfrontendsUrl, oppfolgingUrl } from "./urls";
import AiaStandardWrapper from "./arbeidssoker/AiaStandardWrapper";
import DialogVeileder from "./dialog-veileder/DialogVeileder";
import MeldekortWrapper from "./meldekort/MeldekortWrapper";
import { isMeldekortbruker, type MeldekortDataFraApi } from "./meldekort/meldekortTypes";
import { getProduktConfigMap } from "./produktkort/ProduktConfig";
import { produktText } from "./produktkort/ProduktText";
import Produktkort from "./produktkort/Produktkort";
import MicrofrontendWrapper from "./MicrofrontendWrapper";
import Aktivitetsplan from "./aktivitetsplan/Aktivitetsplan";
import { setIsError } from "./../../store/store.ts";
import { logGroupedEvent, logMfEvent } from "@utils/amplitude.ts";
import type { PersonalizedContent } from "./microfrontendTypes";
import type { Language } from "@language/language.ts";
import { fetcher, include } from "@utils/api.client.ts";
import styles from "./DinOversikt.module.css";

interface Props {
  language: Language;
}

const getUniqueProdukter = (language: Language, personalizedContent?: PersonalizedContent) => {
  if (personalizedContent === undefined) return undefined;

  const produktConfigMap = getProduktConfigMap(language);

  return personalizedContent?.produktkort
    ?.sort((a, b) => a.localeCompare(b))
    .map((sakstema) => produktConfigMap[sakstema]);
};

const DinOversikt = ({ language }: Props) => {
  const {
    data: personalizedContent,
    isLoading: isLoadingMicrofrontends
  } = useSWRImmutable<PersonalizedContent>({ path: microfrontendsUrl, options: include }, fetcher, {
      onError: () => setIsError(),
      onSuccess: (data) => data.microfrontends.map((mf) => logMfEvent(`minside.${mf.microfrontend_id}`, true))
    }
  );

  const {
    data: meldekortFraApi,
    isLoading: isLoadingMeldekort
  } = useSWRImmutable<MeldekortDataFraApi>({ path: meldekortApiUrl, options: include }, fetcher, {
      onError: () => setIsError()
    }
  );

  const { data: arbeidssoker, isLoading: isLoadingStandardAiA } = useSWRImmutable({
    path: arbeidssokerUrl,
    options: include
  }, fetcher);
  const { data: oppfolging, isLoading: isLoadingOppfolging } = useSWRImmutable({
    path: oppfolgingUrl,
    options: include
  }, fetcher);

  const isUnderOppfolging = oppfolging?.underOppfolging;
  const isStandardInnsats = arbeidssoker?.erArbeidssoker && arbeidssoker?.erStandard;

  const microfrontends = personalizedContent?.microfrontends.map((mf) => (
    <MicrofrontendWrapper manifestUrl={mf.url} key={mf.microfrontend_id} />
  ));

  const uniqueProduktConfigs = getUniqueProdukter(language, personalizedContent);

  const hasProduktkort = uniqueProduktConfigs !== undefined && uniqueProduktConfigs.length > 0;
  const hasMicrofrontends = microfrontends !== undefined && microfrontends.length > 0;
  const hasMeldekort = isMeldekortbruker(meldekortFraApi);
  const shouldLogComposition = !isLoadingMicrofrontends && !isLoadingMeldekort && !isLoadingStandardAiA && !isLoadingOppfolging;

  useEffect(() => {
    if (shouldLogComposition) {
      let liste = [];

      if (hasMicrofrontends) {
        personalizedContent?.microfrontends?.map((mf) => liste.push(mf.microfrontend_id));
      }

      uniqueProduktConfigs?.map((produktkort) => liste.push("Produktkort - " + produktkort.tittel));

      if (hasMeldekort) {
        liste.push("meldekort");
      }
      if (isStandardInnsats) {
        liste.push("AiA-standard");
      }
      if (isUnderOppfolging) {
        liste.push("Aktivitetsplan");
        liste.push("Dialog med veileder");
      }

      liste.sort();
      logGroupedEvent(liste.toString());
    }
  }, [shouldLogComposition]);

  if (!hasMicrofrontends && !hasProduktkort && !isUnderOppfolging && !isStandardInnsats && !hasMeldekort) {
    return null;
  } else {
    return (
      <div className={styles.oversiktContainer}>
        <BodyShort as="h2" spacing>
          {produktText.oversiktTittel[language]}
        </BodyShort>
        {isStandardInnsats && <AiaStandardWrapper />}
        {hasMeldekort && (
          <div className={styles.meldekort}>
            <MeldekortWrapper />
          </div>
        )}
        <div className={styles.listeContainer}>
          {microfrontends}
          {isUnderOppfolging && (
            <>
              <DialogVeileder language={language} />
              <Aktivitetsplan language={language} />
            </>
          )}
          {uniqueProduktConfigs && uniqueProduktConfigs?.map((produktConfig) => (
            <Produktkort produktConfig={produktConfig} key={produktConfig.tittel} />
          ))}
        </div>
      </div>
    );
  }
};

export default DinOversikt;
