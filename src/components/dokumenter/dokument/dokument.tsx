import { BodyShort } from "@navikt/ds-react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { formatDateMonth, setAvsenderMottaker } from "@utils/client/dokument.ts";
import type { DokumentType } from "@components/dokumenter/dokumenterTypes.ts";
import { dokumentarkivUrl } from "@components/dokumenter/dokumenterUrls.ts";
import styles from "./dokument.module.css";
import { logEvent } from "@utils/client/amplitude";

interface Props {
  dokument: DokumentType;
}

const Dokument = ({ dokument }: Props) => {
  const dato = formatDateMonth(dokument.opprettet);
  const avsender = setAvsenderMottaker(dokument);

  return (
    <li className={`${styles.container}`}>
      <a
        className={styles.wrapper}
        href={`${dokumentarkivUrl}/tema/${dokument.temakode}/${dokument.journalpostId}`}
        onClick={() => logEvent("dokumentwidget", "dokumenter", "Dokumentlenke")}
      >
        <div>
          <BodyShort className={styles.link} size="medium">
            {dokument.tittel}
          </BodyShort>
          <BodyShort className={styles.details} size="small">
            {dato + " - " + avsender}
          </BodyShort>
        </div>
        <ChevronRightIcon className={styles.chevron} fontSize="20px" />
      </a>
    </li>
  );
};

export default Dokument;
