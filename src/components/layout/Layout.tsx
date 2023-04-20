import React from "react";
import FeilMelding from "../feilmelding/Feilmelding";
import styles from "./Layout.module.css";

type Props = {
  children?: React.ReactNode;
  isError: boolean;
};

const Layout = ({ children, isError }: Props) => {
  return (
    <div className={styles["layout"]}>
      <main className={styles["main"]}>
        {isError ? <FeilMelding /> : null}
        {children}
      </main>
    </div>
  );
};

export default Layout;
