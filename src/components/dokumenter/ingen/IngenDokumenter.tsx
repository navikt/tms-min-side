import { Language } from "@language/language.ts";
import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import { text } from "@language/dokumenter.ts";
import { dokumentarkivUrl } from "@components/dokumenter/dokumenterUrls.ts";
import styles from "./IngenDokumenter.module.css";

interface Props {
  language: Language;
}

const IngenDokumenter = ({ language }: Props) => {

  const spraakTilpassetDokumentarkivUrl = (language: Language) => {
    if(language === "en") {
      return dokumentarkivUrl + "/en";
    }
    if(language === "nn") {
      return dokumentarkivUrl + "/nn";
    }
    return dokumentarkivUrl;
  }

  return (
    <>
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
        <a className={styles.link} href={spraakTilpassetDokumentarkivUrl(language)}>
          {text.dokumentarkiv[language]}
        </a>
      </div>
    </>
  );
};

export default IngenDokumenter;
