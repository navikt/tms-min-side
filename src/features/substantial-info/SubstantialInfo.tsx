import { InformationSquareIcon } from "@navikt/aksel-icons";
import { BodyShort, InfoCard, Link } from "@navikt/ds-react";
import type { Locale } from "@src/shared/utils/server/locale";
import { text } from "./substantialInfoText";

interface Props {
  locale: Locale;
}

export default function SubstantialInfo({ locale }: Props) {
  return (
    <InfoCard data-color="info" as="section" aria-labelledby="substantial-info-title">
      <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
        <InfoCard.Title as="h2" id="substantial-info-title">
          {text.heading[locale]}
        </InfoCard.Title>
      </InfoCard.Header>
      <InfoCard.Content>
        <BodyShort>{text.info[locale]}</BodyShort>
        <Link href="/minside/oauth2/login?level=idporten-loa-high">{text.link[locale]}</Link>
      </InfoCard.Content>
    </InfoCard>
  );
}
