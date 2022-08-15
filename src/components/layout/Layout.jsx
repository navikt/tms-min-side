import React from "react";
import FeilMelding from "../feilmelding/Feilmelding";
import { useLanguage } from "../../hooks/useLanguage";
import styles from "./Layout.module.css";

const Layout = ({ children, isError }) => {
  useLanguage();

  return (
    <div className={styles["layout"]}>
      <main>
        {isError ? <FeilMelding /> : null}
        {children}
      </main>
    </div>
  );
};

export default Layout;
