import styles from "./dokument.module.css";
import { BodyShort } from "@navikt/ds-react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { formatDateMonth } from "@utils/client/dokument.ts";
import { Journalpost } from "@components/dokumenter/dokumenterTypes.ts";
import { mineSakerApiUrl } from "@components/dokumenter/dokumenterUrls.ts";

export const setAvsenderMottaker = (journalpost: Journalpost) => {
  if (!journalpost.avsender) {
    return journalpost.mottaker;
  } else {
    return journalpost.avsender;
  }
}

const Dokument = ({ tittel, opprettet, journalpost } : { tittel: string, opprettet: string, journalpost: Journalpost }) => {
  const dato = formatDateMonth(opprettet);
  const avsender = setAvsenderMottaker(journalpost);

  return (
      <li className={styles.container}>
        <div className={styles.wrapper}>
          <div>
            <a className={styles.link} href={`${mineSakerApiUrl}/dokument/${journalpost.journalpostId}/${journalpost.dokument.dokumentInfoId}`}>
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