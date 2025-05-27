import { BodyLong } from "@navikt/ds-react/cjs/typography/BodyLong.js";
import { Heading } from "@navikt/ds-react/cjs/typography/Heading.js";
import ProduktProperties from "./ProduktProperties.tsx";
import Chevron from "../assets/Chevron";
import styles from "./Produktkort.module.css";

const Produktkort = ({ produktConfig }: { produktConfig: ProduktProperties }) => {
  return (
    <a className={styles.container} href={produktConfig.url}>
      <div className={styles.ikonOgTekstContainer}>
        <div aria-hidden>{produktConfig.ikon}</div>
        <div>
          <Heading size="small" level="2">
            {produktConfig.tittel}
          </Heading>
          <BodyLong size="medium">{produktConfig.ingress}</BodyLong>
        </div>
      </div>
      <Chevron aria-hidden />
    </a>
  );
};

export default Produktkort;
