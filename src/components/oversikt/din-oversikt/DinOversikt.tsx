import { BodyShort } from "@navikt/ds-react";
import useSWRImmutable from "swr/immutable";
import { arbeidssokerUrl, meldekortApiUrl, microfrontendsUrl, mineSakerSakstemaerUrl, oppfolgingUrl, } from "../urls";
import AiaStandardWrapper from "../arbeidssoker/AiaStandardWrapper";
import DialogVeileder from "../dialog-veileder/DialogVeileder";
import MeldekortWrapper from "../meldekort/MeldekortWrapper";
import { type MeldekortDataFraApi, isMeldekortbruker } from "../meldekort/meldekortTypes";
import { getProduktConfigMap } from "../produktkort/ProduktConfig";
import { produktText } from "../produktkort/ProduktText";
import Produktkort from "../produktkort/Produktkort";
import MicrofrontendWrapper from "./MicrofrontendWrapper";
import Aktivitetsplan from "../aktivitetsplan/Aktivitetsplan";
import { setIsError } from "../../../store/store.ts";
import { logMfEvent } from "@utils/amplitude.ts";
import type { EnabledMicrofrontends } from "./microfrontendTypes";
import type { Language } from "@language/language.ts";
import styles from "./DinOversikt.module.css";

type Sakstemaer = Array<{ kode: string }>;

interface Props {
  language: Language;
}

export const fetcher = async (path: string) => {
  const response = await fetch(path, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Fetch request failed");
  }

  return await response.json();
};


const getUniqueProdukter = (language: Language) => {
  const { data: sakstemaer } = useSWRImmutable<Sakstemaer>(mineSakerSakstemaerUrl, fetcher);

  const produktConfigMap = getProduktConfigMap(language);

  const produktConfigs = sakstemaer
    ?.sort((a, b) => a.kode.localeCompare(b.kode))
    .map((sakstema) => produktConfigMap[sakstema.kode])
    .filter((produktConfig) => produktConfig != undefined);

  const uniqueProduktConfigs = produktConfigs?.filter(
    (produktConfig, index) => produktConfigs.findIndex((element) => element.tittel == produktConfig.tittel) === index,
  );

  return uniqueProduktConfigs;
};

const DinOversikt = ({ language }: Props) => {
  const { data: enabledMicrofrontends } = useSWRImmutable<EnabledMicrofrontends>(microfrontendsUrl, fetcher, {
    onError: () => setIsError(),
    onSuccess: (data) => data.microfrontends.map((mf) => logMfEvent(`minside.${mf.microfrontend_id}`, true)),
  });

  const { data: meldekortFraApi } = useSWRImmutable<MeldekortDataFraApi>(meldekortApiUrl, fetcher, {
    onError: () => setIsError(),
  });

  const { data: arbeidssoker } = useSWRImmutable(arbeidssokerUrl, fetcher);
  const { data: oppfolging } = useSWRImmutable(oppfolgingUrl, fetcher);

  const isUnderOppfolging = oppfolging?.underOppfolging;
  const isStandardInnsats = arbeidssoker?.erArbeidssoker && arbeidssoker?.erStandard;

  const microfrontends = enabledMicrofrontends?.microfrontends.map((mf) => (
    <MicrofrontendWrapper manifestUrl={mf.url} key={mf.microfrontend_id} />
  ));

  const uniqueProduktConfigs = getUniqueProdukter(language);

  const hasProduktkort = uniqueProduktConfigs !== undefined && uniqueProduktConfigs.length > 0;
  const hasMicrofrontends = microfrontends !== undefined && microfrontends.length > 0;
  const hasMeldekort = isMeldekortbruker(meldekortFraApi);

  if (!hasMicrofrontends && !hasProduktkort && !isUnderOppfolging && !isStandardInnsats && !hasMeldekort) {
    return null;
  } else {
    return (
      <div className={styles.oversiktContainer}>
        {isStandardInnsats && <AiaStandardWrapper />}
        {hasMicrofrontends || hasProduktkort || isUnderOppfolging || hasMeldekort ? (
          <BodyShort as="h2" spacing>
            {produktText.oversiktTittel[language]}
          </BodyShort>
        ) : null}
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
