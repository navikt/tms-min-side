import { useStore } from "@nanostores/react";
import { Alert } from "@navikt/ds-react";
import { isErrorAtom } from "@src/shared/store/store.ts";
import type { Language } from "@src/shared/utils/server/language.ts";
import styles from "./Feilmelding.module.css";
import { feilmeldingText } from "./feilmeldingText";

interface Props {
  language: Language;
}

const FeilMelding = ({ language }: Props) => {
  const isError = useStore(isErrorAtom);

  if (isError) {
    return (
      <Alert variant="error" className={styles["feilmelding"]}>
        {feilmeldingText.feilmelding[language]}
      </Alert>
    );
  }

  return null;
};

export default FeilMelding;
