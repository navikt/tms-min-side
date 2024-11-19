import styles from "./dokument.module.css";
import { BodyShort } from "@navikt/ds-react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { formatDateMonth, setAvsenderMottaker } from "@utils/client/dokument.ts";
import { Journalpost } from "@components/dokumenter/dokumenterTypes.ts";
import { dokumentarkivUrl } from "@components/dokumenter/dokumenterUrls.ts";

interface Props {
  journalpost: Journalpost;
}

const Dokument = ({ journalpost } : Props) => {
  const dato = formatDateMonth(journalpost.opprettet);
  const avsender = setAvsenderMottaker(journalpost);

  return (
      <li className={`${styles.container}`}>
        <a className={styles.wrapper} href={`${dokumentarkivUrl}/tema/${journalpost.temakode}/${journalpost.journalpostId}`}>
          <div>
              <BodyShort className={styles.link} size="medium">
                {journalpost.dokument.tittel}
              </BodyShort>
            <BodyShort className={styles.details} size="small">{dato + " - " + avsender}</BodyShort>
          </div>
          <ChevronRightIcon className={styles.chevron} fontSize="20px" />
        </a>
      </li>
  );
};

export default Dokument;