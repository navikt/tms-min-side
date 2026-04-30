import { Tag } from "@navikt/ds-react";
import { text } from "./language/text";
import type { Language } from "@language/language.ts";

interface Props {
  innbokser: number;
  language: Language;
}

const InnboksTag = ({ innbokser, language }: Props) => {
  if (innbokser > 0) {
    return (
      <Tag variant="alt3-filled" size="small">
        {innbokser === 1 ? text.innboksNyMeldingEntall[language] : text.innboksNyMeldingFlertall[language](innbokser)}
      </Tag>
    );
  } else {
    return (
      <Tag variant="moderate" data-color="neutral" size="small">
        {text.innboksIngenNyMeldinger[language]}
      </Tag>
    );
  }
};

export default InnboksTag;
