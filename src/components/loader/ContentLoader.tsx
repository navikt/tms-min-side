import { Loader } from "@navikt/ds-react/cjs/loader/Loader.js";
import styles from "./ContentLoader.module.css";

const ContentLoader = () => {
  return (
    <div className={styles["content-loader"]}>
      <Loader transparent title="Laster inn..." size="2xlarge" />
    </div>
  );
};

export default ContentLoader;
