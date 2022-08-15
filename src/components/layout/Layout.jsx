import React from "react";
import FeilMelding from "../feilmelding/Feilmelding";
import "./Layout.module.css";
import { useLanguage } from "../../hooks/useLanguage";

const Layout = ({ children, isError }) => {
  useLanguage();

  return (
    <div className="layout">
      <main>
        {isError ? <FeilMelding /> : null}
        {children}
      </main>
    </div>
  );
};

export default Layout;
