import { Alert, Link } from "@navikt/ds-react";
import { useStore } from "@nanostores/react";
import { isErrorAtom } from "../../store/store.ts";
import { text } from "@language/feilmelding.ts";
import type { Language } from "@language/language.ts";
import styles from "./Infomelding.module.css";

interface Props {
  language: Language;
}

const Infomelding = ({ language }: Props) => {
    return (
      <Alert variant="info" className={styles["feilmelding"]}>
        Vi har for øyeblikket problemer med å vise alle tjenester.
        Hvis du har søkt om økonomisk sosialhjelp kan du gå til <Link href="https://www.nav.no/sosialhjelp/innsyn/">oversikten over søknadene dine</Link>.
      </Alert>
    );
};

export default Infomelding;
