import React from "react";
import { Alert } from "@navikt/ds-react";
import useStore, { selectLanguage } from "../../store/store";
import { text } from "../../language/text";
import "./Feilmelding.module.css";

const FeilMelding = () => {
  const language = useStore(selectLanguage);

  return (
    <Alert variant="error" className="feilmelding">
      {text.feilmelding[language]}
    </Alert>
  );
};

export default FeilMelding;
