import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import { dialogMedVeilederUrl } from "../urls";
import { text } from "../language/text";
import type { Language } from "@language/language.ts";
import { logEvent } from "@utils/client/amplitude.ts";
import styles from "./DialogVeileder.module.css";

interface Props {
  language: Language;
}

const DialogVeileder = ({ language }: Props) => {
  return (
    <a
      className={styles.container}
      href={dialogMedVeilederUrl}
      onClick={() => logEvent("dialog-veileder", "personlig", "Dialog med veilederen din")}
    >
      <div className={styles.headerContainer}>
        <Heading size="small" level="2">
          {text.kommunikasjonsFlisLenketekstDialog[language]}
        </Heading>
        <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
      </div>
      <BodyLong className={styles.text}>{text.kommunikasjonsFlisIngressDialog[language]}</BodyLong>
    </a>
  );
};

export default DialogVeileder;
