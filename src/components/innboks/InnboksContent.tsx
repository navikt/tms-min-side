import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort } from "@navikt/ds-react";
import useSWRImmutable from "swr/immutable";
import { logEvent } from "../../utils/amplitude.ts";
import { fetcher } from "../../utils/api.client.ts";
import { antallVarslerUrl, innboksUrl } from "./innboksUrls.ts";
import { text } from "./innboksText.ts";
import type { Language } from "../../language/language.ts";
import { Skeleton } from "@navikt/ds-react/cjs/skeleton";
import InnboksTag from "./InnboksTag.tsx";
import styles from "./Innboks.module.css";

interface Props {
  language: Language;
}

const InnboksContent = ({ language }: Props) => {
  const { data: varsler, isLoading } = useSWRImmutable({ path: antallVarslerUrl }, fetcher);

  const innbokser = varsler?.innbokser;
  const type = innbokser > 0 ? "NyMelding" : "IngenNyMelding";

  return (
      <>
        <a
          className={`${styles.headerContainer} ${styles[`headerContainer${type}`]}`}
          href={innboksUrl}
          onClick={() => logEvent("innboks.json", "kommunikasjon", "InnboksContent")}
        >
          <BodyShort as="h2">{text.kommunikasjonsFlisLenketekstInnboks[language]}</BodyShort>
          {isLoading
            ? <Skeleton className={styles.dokumentSkeleton} width={120} height={24} />
            : (
              <div className={styles.tagChevron}>
                <InnboksTag innbokser={innbokser} language={language} />
                <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
              </div>
            )
          }
        </a>
          <div className={`${styles.bodyContainer} ${styles[`bodyContainer${type}`]}`}>
            <BodyLong>{text.kommunikasjonsFlisIngressInnboks[language]}</BodyLong>
          </div>
      </>
  );
};

export default InnboksContent;