import type { Language } from "../../language/language.ts";
import { Tag } from "@navikt/ds-react";
import { text } from "./innboksText.ts";

const InnboksTag = ({ innbokser, language }: { innbokser: number; language: Language }) => {
  if (innbokser > 0) {
    return (
      <Tag variant="alt3-filled" size="small">
        {innbokser === 1 ? text.innboksNyMeldingEntall[language] : text.innboksNyMeldingFlertall[language](innbokser)}
      </Tag>
    );
  } else {
    return (
      <Tag variant="neutral-moderate" size="small">
        {text.innboksIngenNyMeldinger[language]}
      </Tag>
    );
  }
};

export default InnboksTag;
