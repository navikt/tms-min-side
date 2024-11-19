import useSWRImmutable from "swr/immutable";
import { fetcher } from "@utils/client/api.ts";
import { setIsError } from "../../store/store.ts";
import { Language } from "@language/language.ts";
import { Journalpost } from "@components/dokumenter/dokumenterTypes.ts";
import Dokument from "@components/dokumenter/dokument/dokument.tsx";
import { BodyShort, Heading } from "@navikt/ds-react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { dokumentarkivUrl, journalposterUrl } from "@components/dokumenter/dokumenterUrls.ts";
import styles from "./dokumenter.module.css";

interface Props {
  language: Language;
}

const Dokumenter = ({ language }: Props) => {
  const { data: journalposter, isLoading, error } = useSWRImmutable<Journalpost[]>({ path: journalposterUrl }, fetcher);

  if (isLoading) {
    return null;
  }

  if (error) {
    setIsError();
  }

  return (
    <>
      <Heading size="xsmall" as="h2" spacing>Dokumentarkiv</Heading>
      <ul className={styles.dokumenter}>
        {journalposter?.slice(0, 3).map((jp) => (
          <Dokument key={jp.dokument.dokumentInfoId} journalpost={jp} />
        ))}
        <div className={styles.alle}>
          <a className={styles.link} href={dokumentarkivUrl}>
          <BodyShort size="medium">
            Se alle
          </BodyShort>
          </a>
          <ChevronRightIcon fontSize="20px" />
        </div>
      </ul>
    </>
  );
};

export default Dokumenter;
