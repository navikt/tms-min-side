import { BodyShort } from "@navikt/ds-react";
import { useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { arbeidssokerUrl, meldekortApiUrl, microfrontendsUrl, mineSakerSakstemaerUrl, oppfolgingUrl } from "./urls.ts";
import AiaStandardWrapper from "./arbeidssoker/AiaStandardWrapper.tsx";
import DialogVeileder from "./dialog-veileder/DialogVeileder.tsx";
import MeldekortWrapper from "./meldekort/MeldekortWrapper.tsx";
import { type MeldekortDataFraApi, isMeldekortbruker } from "./meldekort/meldekortTypes.ts";
import { getProduktConfigMap } from "./produktkort/ProduktConfig.tsx";
import { produktText } from "./produktkort/ProduktText.ts";
import Produktkort from "./produktkort/Produktkort.tsx";
import MicrofrontendWrapper from "./MicrofrontendWrapper.tsx";
import Aktivitetsplan from "./aktivitetsplan/Aktivitetsplan.tsx";
import { setIsError } from "../../store/store.ts";
import { logGroupedEvent, logMfEvent } from "@utils/amplitude.ts";
import type { EnabledMicrofrontends } from "./microfrontendTypes.tsx";
import type { Language } from "@language/language.ts";
import { fetcher, include } from "@utils/api.client.ts";
import styles from "./DinOversikt.module.css";

type Sakstemaer = Array<{ kode: string }>;

interface Props {
  language: Language;
}

const getUniqueProdukter = (language: Language) => {
  const { data: sakstemaer } = useSWRImmutable<Sakstemaer>({ path: mineSakerSakstemaerUrl, options: include }, fetcher);

  const produktConfigMap = getProduktConfigMap(language);

  const produktConfigs = sakstemaer
    ?.sort((a, b) => a.kode.localeCompare(b.kode))
    .map((sakstema) => produktConfigMap[sakstema.kode])
    .filter((produktConfig) => produktConfig != undefined);

  const uniqueProduktConfigs = produktConfigs?.filter(
    (produktConfig, index) => produktConfigs.findIndex((element) => element.tittel == produktConfig.tittel) === index
  );

  return uniqueProduktConfigs;
};

const DinOversikt = ({ language }: Props) => {
  const { data: sakstemaer, isLoading: isLoadingSakstemaer } = useSWRImmutable<Sakstemaer>({ path: mineSakerSakstemaerUrl, options: include }, fetcher);
  const { data: enabledMicrofrontends, isLoading: isLoadingMicrofrontends } = useSWRImmutable<EnabledMicrofrontends>({path: microfrontendsUrl, options: include }, fetcher, {
      onError: () => setIsError(),
      onSuccess: (data) => data.microfrontends.map((mf) => logMfEvent(`minside.${mf.microfrontend_id}`, true)),
    }
  );

  const { data: meldekortFraApi, isLoading: isLoadingMeldekort } = useSWRImmutable<MeldekortDataFraApi>({ path: meldekortApiUrl, options: include }, fetcher, {
      onError: () => setIsError(),
    }
  );

  const { data: arbeidssoker, isLoading: isLoadingStandardAiA } = useSWRImmutable({ path: arbeidssokerUrl, options: include }, fetcher);
  const { data: oppfolging, isLoading: isLoadingOppfolging } = useSWRImmutable({ path: oppfolgingUrl, options: include }, fetcher);

  const isUnderOppfolging = oppfolging?.underOppfolging;
  const isStandardInnsats = arbeidssoker?.erArbeidssoker && arbeidssoker?.erStandard;

  const microfrontends = enabledMicrofrontends?.microfrontends.map((mf) => (
    <MicrofrontendWrapper manifestUrl={mf.url} key={mf.microfrontend_id} />
  ));

  const uniqueProduktConfigs = getUniqueProdukter(language);

  const hasProduktkort = uniqueProduktConfigs !== undefined && uniqueProduktConfigs.length > 0;
  const hasMicrofrontends = microfrontends !== undefined && microfrontends.length > 0;
  const hasMeldekort = isMeldekortbruker(meldekortFraApi);
  const shouldLogComposition = !isLoadingMicrofrontends && !isLoadingMeldekort && !isLoadingStandardAiA && !isLoadingOppfolging && !isLoadingSakstemaer;

  useEffect(() => {
    if (shouldLogComposition) {
      let liste = [];

      if (hasMicrofrontends) {
        enabledMicrofrontends?.microfrontends?.map((mf) => liste.push(mf.microfrontend_id));
      }

      uniqueProduktConfigs?.map((produktkort) => liste.push("Produktkort - " + produktkort.tittel));

      if (hasMeldekort) {
        liste.push("meldekort")
      }
      if (isStandardInnsats) {
        liste.push("AiA-standard")
      }
      if (isUnderOppfolging) {
        liste.push("Aktivitetsplan")
        liste.push("Dialog med veileder")
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
          {uniqueProduktConfigs?.map((produktConfig) => (
            <Produktkort produktConfig={produktConfig} key={produktConfig.tittel} />
          ))}
        </div>
      </div>
    );
  }
};

export default DinOversikt;
