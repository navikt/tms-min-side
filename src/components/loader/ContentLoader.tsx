import { Loader } from "@navikt/ds-react/cjs/loader/Loader.js";
import styles from "./ContentLoader.module.css";

interface Props {
  hide?: boolean;
}

const ContentLoader = ({ hide } : Props) => {
  const cls = hide && "Hide";

  return (
    <div className={styles[`contentLoader${cls}`]}>
      <Loader transparent title="Laster inn..." size="2xlarge" />
    </div>
  );
};

export default ContentLoader;
