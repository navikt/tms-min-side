import { BodyLong, Heading } from "@navikt/ds-react";
import ProduktProperties from "./ProduktProperties.tsx";
import { ChevronRightIcon as Chevron }  from "@navikt/aksel-icons";
import styles from "./Produktkort.module.css";

const Produktkort = ({ produktConfig }: { produktConfig: ProduktProperties }) => {
  return (
    <a className={styles.container} href={produktConfig.url}>
      <div className={styles.ikonOgTekstContainer}>
        <div aria-hidden>{produktConfig.ikon}</div>
        <div>
          <Heading size="small" level="3">
            {produktConfig.tittel}
          </Heading>
          <BodyLong size="medium">{produktConfig.ingress}</BodyLong>
        </div>
      </div>
      <Chevron className={styles.chevron} aria-hidden fontSize="24px" />
    </a>
  );
};

export default Produktkort;
