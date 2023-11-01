import { BodyLong, BodyShort } from "@navikt/ds-react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { utbetalingsoversiktUrl } from "../utbetalingUrls.ts";
import { logEvent } from "@utils/amplitude.ts";
import type { Language } from "../../../language/language.ts";
import { text } from "../utbetalingText.ts";
import styles from "./IngenUtbetaling.module.css";

interface Props {
  language: Language;
}

const IngenUtbetaling = ({ language }: Props) => {
  return (
    <div className={styles.ingenUtbetalinger}>
      <a
        className={`${styles.headerContainer}`}
        href={utbetalingsoversiktUrl}
        onClick={() => logEvent("utbetaling-widget", "generell", "Du har ingen...")}
      >
        <BodyShort as="h2">Siste utbetaling</BodyShort>
        <div className={styles.tagChevron}>
          <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
        </div>
      </a>
      <div className={styles.bodyContainer}>
        <BodyLong>{text.ingen[language]}</BodyLong>
      </div>
    </div>
  );
}

export default IngenUtbetaling;
