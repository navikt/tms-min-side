import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import ProduktProperties from "./ProduktProperties.tsx";
import { logEvent } from "@utils/client/amplitude.ts";
import styles from "./Produktkort.module.css";

const Produktkort = ({ produktConfig }: { produktConfig: ProduktProperties }) => {
  return (
    <a
      className={styles.container}
      href={produktConfig.url}
      onClick={() => logEvent("produktkort", "personlig", produktConfig.produktnavn)}
    >
      <div className={styles.ikonOgTekstContainer}>
        <div aria-hidden>{produktConfig.ikon}</div>
        <div>
          <Heading size="small" level="2">
            {produktConfig.tittel}
          </Heading>
          <BodyLong size="medium">{produktConfig.ingress}</BodyLong>
        </div>
      </div>
      <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
    </a>
  );
};

export default Produktkort;
