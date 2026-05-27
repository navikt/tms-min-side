import { Tag } from "@navikt/ds-react";
import type { Locale } from "@src/shared/utils/server/locale.ts";
import { text } from "./innboksText";

interface Props {
  innbokser: number;
  locale: Locale;
}

const InnboksTag = ({ innbokser, locale }: Props) => {
  if (innbokser > 0) {
    return (
      <Tag variant="alt3-filled" size="small">
        {innbokser === 1 ? text.innboksNyMeldingEntall[locale] : text.innboksNyMeldingFlertall[locale](innbokser)}
      </Tag>
    );
  } else {
    return (
      <Tag variant="moderate" data-color="neutral" size="small">
        {text.innboksIngenNyMeldinger[locale]}
      </Tag>
    );
  }
};

export default InnboksTag;
