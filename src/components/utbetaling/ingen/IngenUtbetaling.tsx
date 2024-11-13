import { BodyLong, BodyShort, Label } from "@navikt/ds-react";
import { logEvent } from "@utils/client/amplitude.ts";
import type { Language } from "@language/language.ts";
import { text } from "@language/utbetaling.ts";
import styles from "./IngenUtbetaling.module.css";

interface Props {
  language: Language;
}

const IngenUtbetaling = ({ language }: Props) => {
  return (
    <div className={styles.ingen}>
      <div
        className={styles.header}
        onClick={() => logEvent("utbetaling-widget", "generell", "Du har ingen...")}
      >
        <BodyShort as="h2">
          {text.tittel[language]}
        </BodyShort>
      </div>
      <div className={styles.content}>
        <BodyLong className={styles.text}>
          {text.ingen[language]}
        </BodyLong>
        <Label size="small">
          <a className="navds-button navds-button--primary-neutral navds-button--small" href={"utbetalingsoversiktUrl"}>
            {text.tidligere[language]}
          </a>
        </Label>
      </div>
    </div>
  );
}

export default IngenUtbetaling;
