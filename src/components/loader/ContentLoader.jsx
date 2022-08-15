import React from "react";
import { Loader } from "@navikt/ds-react";
import "./ContentLoader.module.css";

const ContentLoader = () => {
  return (
    <div className="content-loader">
      <Loader transparent title="Laster inn..." size="2xlarge" />
    </div>
  );
};

export default ContentLoader;
