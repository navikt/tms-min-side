import { ChevronRightIcon } from "@navikt/aksel-icons";
import { Heading } from "@navikt/ds-react/cjs/typography/Heading.js";
import { BodyLong } from "@navikt/ds-react/cjs/typography/BodyLong.js";
import { formatDateMonth } from "@utils/client/dokument.ts";
import { text } from "@language/dokumentarkiv.ts"
import type { Language } from "@language/language.ts";
import { logEvent } from "@utils/client/amplitude.ts";
import styles from "./Dokument.module.css";

interface Props {
  href: string;
  kode: string;
  sakstema: string;
  sistEndret: string;
  language: Language;
}

const Dokument = ({ href, sakstema, kode, sistEndret, language }: Props) => {

  const isAarsoppgaveTema = kode === "STO";

  return (
    <a className={styles.container} href={href} onClick={() => logEvent("dokumentarkiv", "generell", sakstema)}>
      <div>
        <Heading size="small" level="2">
          {isAarsoppgaveTema ? text.aarsoppgaveTittel[language] : sakstema}
        </Heading>
        <BodyLong className={styles.dato}>
          {text.detail[language] + formatDateMonth(sistEndret)}
        </BodyLong>
      </div>
      <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
    </a>
  );
};

export default Dokument;
