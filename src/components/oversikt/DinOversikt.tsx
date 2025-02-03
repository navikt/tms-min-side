import { BodyShort } from "@navikt/ds-react";
import useSWRImmutable from "swr/immutable";
import { dinOversiktUrl } from "./urls";
import DialogVeileder from "./dialog-veileder/DialogVeileder";
import MeldekortWrapper from "./meldekort/MeldekortWrapper";
import { getProduktProperties } from "@utils/client/oversikt.ts";
import { produktText } from "./produktkort/ProduktText";
import Produktkort from "./produktkort/Produktkort";
import MicrofrontendWrapper from "./MicrofrontendWrapper";
import Aktivitetsplan from "./aktivitetsplan/Aktivitetsplan";
import { setDokumenter, setDokumenterError, setDokumenterLoading, setIsError } from "./../../store/store.ts";
import { logMfEvent } from "@utils/client/amplitude.ts";
import type { PersonalizedContent } from "./microfrontendTypes";
import type { Language } from "@language/language.ts";
import { fetcher, include } from "@utils/client/api.ts";
import { useOversikt } from "@hooks/useOversikt.ts";
import { useLogComposition } from "@hooks/useLogComposition.ts";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./DinOversikt.module.css";

interface Props {
  language: Language;
}

const DinOversikt = ({ language }: Props) => {
  const {
    data: personalizedContent, isLoading, error
  } = useSWRImmutable<PersonalizedContent>({ path: dinOversiktUrl, options: include }, fetcher, {
      onError: () => {
        setIsError();
        setDokumenterError();
      },
      onSuccess: (data) => {
        data.microfrontends.map((mf) => logMfEvent(`minside.${mf.microfrontend_id}`, true));
      }
    }
  );

  setDokumenterLoading(isLoading);

  const produktProperties = getProduktProperties(language, personalizedContent);
  const shouldShowOversikt = useOversikt(produktProperties);

  useLogComposition(produktProperties);

  if (personalizedContent) {
    setDokumenter(personalizedContent.dokumenter);
  }

  if (!shouldShowOversikt) {
    return null;
  }

  if (shouldShowOversikt) {
    return (
      <div className={styles.oversiktContainer}>
        <BodyShort as="h2" spacing>
          {produktText.oversiktTittel[language]}
        </BodyShort>
        {personalizedContent?.meldekort && (
          <div className={styles.meldekort}>
            <MeldekortWrapper />
          </div>
        )}
        <ResponsiveMasonry columnsCountBreakPoints={{ 480: 1, 767: 2 }}>
          <Masonry columnsCount={2} gutter="1rem">
            {personalizedContent?.microfrontends.map((mf) => (
              <MicrofrontendWrapper manifestUrl={mf.url} key={mf.microfrontend_id} />
            ))}
            {personalizedContent?.oppfolgingContent && <DialogVeileder language={language} />}
            {personalizedContent?.oppfolgingContent && <Aktivitetsplan language={language} />}
            {produktProperties?.map((produktConfig) => (
              <Produktkort produktConfig={produktConfig} key={produktConfig.tittel} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    );
  }
};

export default DinOversikt;
