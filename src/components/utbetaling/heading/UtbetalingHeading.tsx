import { BodyShort } from "@navikt/ds-react";
import { utbetalingsoversiktUrl } from "../utbetalingUrls";
import { text } from "@language/utbetaling.ts";
import type { Language } from "@language/language.ts";
import { logEvent } from "@utils/amplitude.ts";
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
        onClick={() => logEvent("utbetaling-widget", "generell", "Se alle")}
      >
        <BodyShort>{text.alle[language]}</BodyShort>
      </a>
    </div>
  );
};

export default UtbetalingHeading;
