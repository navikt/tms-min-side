import { BodyShort } from "@navikt/ds-react/cjs/typography/BodyShort.js";
import { BodyLong } from "@navikt/ds-react/cjs/typography/BodyLong.js";
import { Skeleton } from "@navikt/ds-react/cjs/skeleton";
import useSWRImmutable from "swr/immutable";
import Dokument from "../dokument/Dokument.tsx";
import { mineSakerApiSisteUrl, dokumentarkivUrl } from "../dokumentarkivUrls.ts";
import { FileTextIcon } from '@navikt/aksel-icons';
import { fetcher } from "../../../utils/api.client.ts";
import type { Language } from "../../../language/language.ts";
import { text } from "./dokumenterText";
import { logEvent } from "../../../utils/amplitude.ts";
import styles from "./Dokumenter.module.css";

interface Dokument {
  navn: string;
  kode: string;
  sistEndret: string;
  detaljvisningUrl: string;
}

interface Dokumenter {
  sakstemaer: Dokument[];
}

interface Props {
  language: Language;
}

const Dokumenter = ({ language }: Props) => {
  const { data: saker, isLoading } = useSWRImmutable<Dokumenter>({ path: mineSakerApiSisteUrl }, fetcher);
  const hasDokumenter = saker && saker.sakstemaer.length > 0;

  if (isLoading) {
    return (
      <div className={styles.dokumentContainer}>
        <BodyShort as="h2" spacing={true}>
          {text.heading[language]}
        </BodyShort>
        <div className={styles.skeletonContainer}>
          <Skeleton className={styles.dokumentSkeleton} width={272} height={20} />
          <Skeleton className={styles.dokumentSkeleton} width={199} height={20} />
        </div>
        <div className={styles.skeletonContainer}>
          <Skeleton className={styles.dokumentSkeleton} width={109} height={20} />
          <Skeleton className={styles.dokumentSkeleton} width={199} height={20} />
        </div>
        <div className={styles.skeletonContainer}>
          <Skeleton className={styles.dokumentSkeleton} width={48} height={20} />
        </div>
      </div>
    );
  }

  return (
    <>
      {hasDokumenter ? (
        <div className={styles.dokumentContainer}>
          <BodyShort as="h2" spacing={true}>
            {text.heading[language]}
          </BodyShort>
          {saker?.sakstemaer.slice(0, 2).map((dokument: Dokument) => (
            <Dokument
              key={dokument.kode}
              href={dokument.detaljvisningUrl}
              sakstema={dokument.navn}
              sistEndret={dokument.sistEndret}
              language={language}
            />
          ))}
          <BodyShort className={styles.linkContainer}>
            <a
              className={styles.link}
              href={dokumentarkivUrl}
              onClick={() => logEvent("dokumentarkiv", "generell", "Gå til dokumentarkivet")}
            >
              {text.dokumentarkiv[language]}
            </a>
          </BodyShort>
        </div>
      ) : (
        <>
          <BodyShort as="h2" spacing={true}>
            {text.heading[language]}
          </BodyShort>
          <div className={styles.ingenContainer}>
            <FileTextIcon aria-hidden fontSize="32px" />
            <BodyLong>{text.ingen[language]}</BodyLong>
          </div>
          <a className={styles.link} href={dokumentarkivUrl} >
            {text.dokumentarkiv[language]}
          </a>
        </>
      )}
    </>
  );
};

export default Dokumenter;
