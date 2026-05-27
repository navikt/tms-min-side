import { useStore } from "@nanostores/react";
import { Alert } from "@navikt/ds-react";
import { isErrorAtom } from "@src/shared/store/store.ts";
import type { Locale } from "@src/shared/utils/server/locale.ts";
import styles from "./Feilmelding.module.css";
import { feilmeldingText } from "./feilmeldingText";

interface Props {
  locale: Locale;
}

const FeilMelding = ({ locale }: Props) => {
  const isError = useStore(isErrorAtom);

  if (isError) {
    return (
      <Alert variant="error" className={styles["feilmelding"]}>
        {feilmeldingText.feilmelding[locale]}
      </Alert>
    );
  }

  return null;
};

export default FeilMelding;
