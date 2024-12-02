import useSWRImmutable from "swr/immutable";
import { fetcher } from "@utils/client/api.ts";
import { setIsError } from "../../store/store.ts";
import { Language } from "@language/language.ts";
import type { DokumentType } from "@components/dokumenter/dokumenterTypes.ts";
import Dokument from "@components/dokumenter/dokument/dokument.tsx";
import IngenDokumenter from "@components/dokumenter/ingen/IngenDokumenter.tsx";
import { BodyShort, Heading } from "@navikt/ds-react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { dokumentarkivUrl, journalposterUrl } from "@components/dokumenter/dokumenterUrls.ts";
import { Skeleton } from "@navikt/ds-react/cjs/skeleton";
import text from "@language/dokumenter.ts"
import styles from "./dokumenter.module.css";

interface Props {
  language: Language;
}

const Dokumenter = ({ language }: Props) => {
  const { data: dokumenter, isLoading, error } = useSWRImmutable<DokumentType[]>({ path: journalposterUrl }, fetcher);
  const hasDokumenter = dokumenter && dokumenter.length > 0;

  if (isLoading) {
    return (
      <>
        <Heading size="xsmall" as="h2" spacing>{text.heading}</Heading>
        <Skeleton variant="text" height="50px" width="100%" />
        <Skeleton variant="text" height="50px" width="100%" />
        <Skeleton variant="text" height="50px" width="100%" />
      </>
    );
  }

  if (!hasDokumenter) {
    return <IngenDokumenter language={language} />;
  }

  if (error) {
    setIsError();
  }

  return (
    <>
      <Heading size="xsmall" as="h2" spacing>{text.heading}</Heading>
      <ul className={styles.dokumenter}>
        {dokumenter?.slice(0, 3).map((dokument) => (
          <Dokument key={dokument.dokumentInfoId} dokument={dokument} />
        ))}
        <div className={styles.alle}>
          <a className={styles.link} href={dokumentarkivUrl}>
            <BodyShort size="medium">
              {text.alle}
            </BodyShort>
          </a>
          <ChevronRightIcon fontSize="20px" />
        </div>
      </ul>
    </>
  );
};

export default Dokumenter;
