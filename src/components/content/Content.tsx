import type React from "react";
import styles from "./Content.module.css";

interface Props {
  children?: React.ReactNode;
}

const Content = ({ children }: Props) => {
  return (
    <div className={styles["content"]}>
      <div className={styles["layout"]}>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Content;
