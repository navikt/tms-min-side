import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import { aktivitetsplanUrl } from "../urls.ts";
import { text } from "../language/text";
import { logEvent } from "@utils/amplitude.ts";
import type { Language } from "@language/language.ts";
import styles from "./Aktivitetsplan.module.css";

interface Props {
  language: Language;
}

const Aktivitetsplan = ({ language }: Props) => {
  return (
    <a
      className={styles.container}
      href={aktivitetsplanUrl}
      onClick={() => logEvent("aktivitetsplan", "personlig", "Aktivitetsplan")}
    >
      <div className={styles.headerContainer}>
        <Heading size="small" level="2">
          {text.aktivitetsplanTittel[language]}
        </Heading>
        <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
      </div>
      <BodyLong className={styles.text}>{text.aktivitetsplanIngress[language]}</BodyLong>
    </a>
  );
};

export default Aktivitetsplan;
