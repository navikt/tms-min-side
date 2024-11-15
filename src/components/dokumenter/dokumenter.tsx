import useSWRImmutable from "swr/immutable";
import { fetcher } from "@utils/client/api.ts";
import { setIsError } from "../../store/store.ts";
import { Language } from "@language/language.ts";
import { Journalpost } from "@components/dokumenter/dokumenterTypes.ts";
import Dokument from "@components/dokumenter/dokument/dokument.tsx";
import { BodyShort } from "@navikt/ds-react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import styles from "./dokumenter.module.css";
import { journalposterUrl } from "@components/dokumenter/dokumenterUrls.ts";

interface Props {
  language: Language;
}

const Dokumenter = ({ language }: Props) => {
  const { data: journalposter, isLoading, error } = useSWRImmutable<Journalpost[]>({ path: journalposterUrl }, fetcher);

  if (error) {
    setIsError();
  }

  // minesaker-api/dokument/journalpostId/dokumentinfoId

  return (
    <ul className={styles.dokumenter}>
      {journalposter?.slice(0, 3).map((jp) => (
        <Dokument
          tittel={jp.dokument.tittel}
          opprettet={jp.opprettet}
          journalpost={jp}
          key={jp.dokument.dokumentInfoId}
        />
      ))}
      <div className={styles.alle}>
        <a className={styles.link} href={"/test"}>
        <BodyShort size="medium">
          Se alle
        </BodyShort>
        </a>
        <ChevronRightIcon fontSize="20px" />
      </div>
    </ul>
  );
};

export default Dokumenter;
