import styles from "./dokument.module.css";
import { BodyShort } from "@navikt/ds-react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { formatDateMonth } from "@utils/client/dokument.ts";
import { Journalpost } from "@components/dokumenter/dokumenterTypes.ts";
import { dokumentarkivUrl } from "@components/dokumenter/dokumenterUrls.ts";

export const setAvsenderMottaker = (journalpost: Journalpost) => {
  if (!journalpost.avsender) {
    return journalpost.mottaker;
  } else {
    return journalpost.avsender;
  }
}

// dokumentarkivet/tema/{temakode}/{journalpostId}

const Dokument = ({ tittel, opprettet, journalpost } : { tittel: string, opprettet: string, journalpost: Journalpost }) => {
  const dato = formatDateMonth(opprettet);
  const avsender = setAvsenderMottaker(journalpost);

  return (
      <li className={styles.container}>
        <div className={styles.wrapper}>
          <div>
            <a className={styles.link} href={`${dokumentarkivUrl}/tema/${journalpost.temakode}/${journalpost.journalpostId}`}>
              <BodyShort size="medium">
                {tittel}
              </BodyShort>
            </a>
            <BodyShort size="small">{dato + " - " + avsender}</BodyShort>
          </div>
          <ChevronRightIcon className={styles.chevron} fontSize="20px" />
        </div>
      </li>
  );
};

export default Dokument;