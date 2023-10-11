import { ChevronRightIcon } from "@navikt/aksel-icons";
import { Heading } from "@navikt/ds-react/cjs/typography/Heading.js";
import { BodyLong } from "@navikt/ds-react/cjs/typography/BodyLong.js";
import { formatDateMonth } from "./dokumentUtils.ts";
import { text } from "./dokumentText"
import type { Language } from "../../../language/language.ts";
import styles from "./Dokument.module.css";
import { logEvent } from "../../../utils/amplitude.ts";

interface Props {
  href: string;
  sakstema: string;
  sistEndret: string;
  language: Language;
}

const Dokument = ({ href, sakstema, sistEndret, language }: Props) => {
  return (
    <a className={styles.container} href={href} onClick={() => logEvent("dokumentarkiv", "generell", sakstema)}>
      <div>
        <Heading size="small" level="2">
          {sakstema}
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
