import { Loader } from "@navikt/ds-react";
import styles from "./ContentLoader.module.css";

const ContentLoader = () => {
  return (
    <div className={styles.contentLoader}>
      <Loader transparent size="medium" />
    </div>
  );
};

export default ContentLoader;
