import { BodyShort } from "@navikt/ds-react/cjs/typography/BodyShort.js";
import { BodyLong } from "@navikt/ds-react/cjs/typography/BodyLong.js";
import { Skeleton } from "@navikt/ds-react/cjs/skeleton";
import Dokument from "../dokument/Dokument.tsx";
import { dokumentarkivUrl } from "../dokumentarkivUrls.ts";
import type { Language } from "@language/language.ts";
import { text } from "@language/dokumentarkiv.ts";
import { logEvent } from "@utils/amplitude.ts";
import { Heading } from "@navikt/ds-react";
import { dokumenterAtom, dokumenterError, dokumenterLoading, isErrorAtom, setIsError } from "../../../store/store.ts";
import styles from "./Dokumenter.module.css";
import { useStore } from "@nanostores/react";

interface Dokument {
  navn: string;
  kode: string;
  sistEndret: string;
  url: string;
}

interface Props {
  language: Language;
}

const Dokumenter = ({ language }: Props) => {
  const dokumenter = useStore(dokumenterAtom);
  const isLoading = useStore(dokumenterLoading);
  const isError = useStore(dokumenterError);
  const hasDokumenter = dokumenter.length > 0;
  
  const spraakTilpassetDokumentarkivUrl = (language: Language) => {
    if(language === "en") {
      return dokumentarkivUrl + "/en";
    }
    if(language === "nn") {
      return dokumentarkivUrl + "/nn";
    }
    return dokumentarkivUrl;
  }

  if (isLoading) {
    return (
      <div className={styles.dokumentContainer}>
        <BodyShort as="h2" spacing={true}>
          {text.heading[language]}
        </BodyShort>
        <div className={styles.skeletonContainer}>
          <Skeleton className={styles.dokumentSkeleton} width={272} height={20} />
          <Skeleton className={styles.dokumentSkeleton} width={199} height={20} />
        </div>
        <div className={styles.skeletonContainer}>
          <Skeleton className={styles.dokumentSkeleton} width={109} height={20} />
          <Skeleton className={styles.dokumentSkeleton} width={199} height={20} />
        </div>
        <div className={styles.skeletonContainer}>
          <Skeleton className={styles.dokumentSkeleton} width={48} height={20} />
        </div>
      </div>
    );
  }

  if (isError) {
    setIsError();
  }

  return (
    <>
      {hasDokumenter ? (
        <div className={styles.dokumentContainer}>
          <BodyShort as="h2" spacing={true}>
            {text.heading[language]}
          </BodyShort>
          {dokumenter.map((dokument: Dokument) => (
            <Dokument
              key={dokument.kode}
              kode={dokument.kode}
              href={dokument.url}
              sakstema={dokument.navn}
              sistEndret={dokument.sistEndret}
              language={language}
            />
          ))}
          <BodyShort className={styles.linkContainer}>
            <a
              className={styles.link}
              href={spraakTilpassetDokumentarkivUrl(language)}
              onClick={() => logEvent("dokumentarkiv", "generell", "Gå til dokumentarkivet")}
            >
              {text.dokumentarkiv[language]}
            </a>
          </BodyShort>
        </div>
      ) : (
        <div className={styles.dokumentContainer}>
          <BodyShort as="h2" spacing={true}>
            {text.heading[language]}
          </BodyShort>
          <div className={styles.skeletonContainer}>
            <Heading size="small" as="h3">
              {text.ingenHeading[language]}
            </Heading>
            <BodyLong className={styles.ingenText}>
              {text.ingenText[language]}
            </BodyLong>
          </div>
          <div className={styles.skeletonContainer} />
            <a className={styles.link} href={spraakTilpassetDokumentarkivUrl(language)} >
              {text.dokumentarkiv[language]}
            </a>
          </div>
      )}
    </>
  );
};

export default Dokumenter;
