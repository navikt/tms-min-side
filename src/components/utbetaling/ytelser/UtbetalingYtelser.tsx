import { BodyShort } from "@navikt/ds-react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { utbetalingsoversiktUrl } from "../utbetalingUrls";
import { Skeleton } from "@navikt/ds-react/cjs/skeleton";
import styles from "./UtbetalingYtelser.module.css";

interface Props {
  ytelse?: string;
  utbetaling?: number;
  id?: string;
  isKommende?: boolean;
  isSkeleton?: boolean;
}

const UtbetalingYtelser = ({ ytelse, utbetaling, isKommende, id, isSkeleton }: Props) => {
  if (isSkeleton) {
    return (
      <div className={styles.wrapper}>
        <a
          href={`${utbetalingsoversiktUrl}/utbetaling/${id}`}
          className={`${styles.container} ${isKommende ? styles.kommende : styles.utbetalt}`}
        >
          <div className={styles.ytelse}>
            <Skeleton width={225} height={24} />
            <Skeleton width={125} height={24} />
          </div>
          <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
        </a>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <a
        href={`${utbetalingsoversiktUrl}/utbetaling/${id}`}
        className={`${styles.container} ${isKommende ? styles.kommende : styles.utbetalt}`}
      >
        <div className={styles.ytelse}>
          <BodyShort>{ytelse}</BodyShort>
          <BodyShort weight="semibold" className={styles.ytelseSum}>{`${utbetaling?.toLocaleString(
            "no-nb",
          )} kr`}</BodyShort>
        </div>
        <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
      </a>
    </div>
  );
};

export default UtbetalingYtelser;
