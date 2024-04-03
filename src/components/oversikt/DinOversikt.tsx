import { BodyShort } from "@navikt/ds-react";
import useSWRImmutable from "swr/immutable";
import { microfrontendsUrl } from "./urls";
import AiaStandardWrapper from "./arbeidssoker/AiaStandardWrapper";
import NyAiaStandardWrapper from "./arbeidssoker/NyAiaStandardWrapper.tsx";
import DialogVeileder from "./dialog-veileder/DialogVeileder";
import MeldekortWrapper from "./meldekort/MeldekortWrapper";
import { getProduktProperties } from "@utils/oversikt.ts";
import { produktText } from "./produktkort/ProduktText";
import Produktkort from "./produktkort/Produktkort";
import MicrofrontendWrapper from "./MicrofrontendWrapper";
import Aktivitetsplan from "./aktivitetsplan/Aktivitetsplan";
import { setIsError } from "./../../store/store.ts";
import { logMfEvent } from "@utils/amplitude.ts";
import type { PersonalizedContent } from "./microfrontendTypes";
import type { Language } from "@language/language.ts";
import { fetcher, include } from "@utils/api.client.ts";
import { useOversikt } from "@hooks/useOversikt.ts";
import { useLogComposition } from "@hooks/useLogComposition.ts";
import styles from "./DinOversikt.module.css";

interface Props {
  language: Language;
}

const DinOversikt = ({ language }: Props) => {
  const {
    data: personalizedContent
  } = useSWRImmutable<PersonalizedContent>({ path: microfrontendsUrl, options: include }, fetcher, {
      onError: () => setIsError(),
      onSuccess: (data) => data.microfrontends.map((mf) => logMfEvent(`minside.${mf.microfrontend_id}`, true))
    }
  );

  const produktProperties = getProduktProperties(language, personalizedContent);
  const shouldShowOversikt = useOversikt(produktProperties);

  useLogComposition(produktProperties)

  if (!shouldShowOversikt) {
    return null
  }

  if (shouldShowOversikt) {
    return (
      <div className={styles.oversiktContainer}>
        <BodyShort as="h2" spacing>
          {produktText.oversiktTittel[language]}
        </BodyShort>
        {personalizedContent?.brukNyAia && <NyAiaStandardWrapper />}
        {personalizedContent?.aiaStandard && <AiaStandardWrapper />}
        {personalizedContent?.meldekort && (
          <div className={styles.meldekort}>
            <MeldekortWrapper />
          </div>
        )}
        <div className={styles.listeContainer}>
          {personalizedContent?.microfrontends.map((mf) => (
            <MicrofrontendWrapper manifestUrl={mf.url} key={mf.microfrontend_id} />
          ))}
          {personalizedContent?.oppfolgingContent && (
            <>
              <DialogVeileder language={language} />
              <Aktivitetsplan language={language} />
            </>
          )}
          {produktProperties?.map((produktConfig) => (
            <Produktkort produktConfig={produktConfig} key={produktConfig.tittel} />
          ))}
        </div>
      </div>
    );
  }
};

export default DinOversikt;
