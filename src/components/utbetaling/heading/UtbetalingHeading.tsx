import { BodyShort } from "@navikt/ds-react";
import { text } from "../utbetalingText";
import { utbetalingsoversiktUrl } from "../utbetalingUrls";
import type { Language } from "../../../language/language.ts";
import styles from "./UtbetalingHeading.module.css";

interface Props {
  type?: string;
  language: Language;
}

const UtbetalingHeading = ({ type, language }: Props) => {

  if (type === "ingen") {
    return (
      <div className={styles.heading}>
        <BodyShort as="h2" spacing>
          {text.tittel[language]}
        </BodyShort>
      </div>
    );
  }

  return (
    <div className={styles.heading}>
      <BodyShort as="h2" spacing>
        {type === "neste" ? text.tittelNeste[language] : text.tittel[language]}
      </BodyShort>
      <a
        className={styles.link}
        href={utbetalingsoversiktUrl}
        onClick={() => logNavigereEvent("utbetaling-widget", "generell", "Se alle")}
      >
        <BodyShort>{text.alle[language]}</BodyShort>
      </a>
    </div>
  );
};

export default UtbetalingHeading;
