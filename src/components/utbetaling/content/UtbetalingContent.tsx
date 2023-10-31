import useSWRImmutable from "swr/immutable";
import { BodyLong, Heading } from "@navikt/ds-react";
import { utbetalingsoversiktApiUrl } from "../utbetalingUrls.ts";
import { formatToReadableDate, summerYtelser } from "../utbetalingUtils.ts";
import UtbetalingYtelser from "../ytelser/UtbetalingYtelser.tsx";
import UtbetalingHeading from "../heading/UtbetalingHeading.tsx";
import type { UtbetalingResponse } from "../utbetalingTypes.ts";
import { text } from "../utbetalingText.ts";
import type { Language } from "../../../language/language.ts";
import { fetcher } from "../../../utils/api.client.ts";
import { Skeleton } from "@navikt/ds-react/cjs/skeleton";
import IngenUtbetalinger from "../ingen/IngenUtbetalinger.tsx";
import style from "./UtbetalingContent.module.css";

interface Props {
  language: Language;
}

const UtbetalingContent = ({ language }: Props) => {
  const { data, isLoading } = useSWRImmutable<UtbetalingResponse>({ path: utbetalingsoversiktApiUrl }, fetcher);

  if (isLoading) {
    return (
      <>
        <div className={style.detaljer}>
          <div className={`${style.detaljerContainer}`}>
            <UtbetalingHeading type="ingen" language={language} />
            <Skeleton width={116} height={28} />
            <Skeleton width={225} height={24} />
          </div>
        </div>
        <UtbetalingYtelser isSkeleton={true} />
      </>
    );
  }

  if (!data) {
    return null;
  }

  const hasKommendeUtbetaling = data.kommendeUtbetalinger.length > 0;
  const hasUtbetaltUtbetaling = data.utbetalteUtbetalinger.length > 0;

  if (!hasKommendeUtbetaling && !hasUtbetaltUtbetaling) {
    return <IngenUtbetalinger language={language} />
  }

  const utbetalingToShow = hasKommendeUtbetaling ? data.kommendeUtbetalinger[0] : data.utbetalteUtbetalinger[0];
  const sum = summerYtelser(utbetalingToShow.underytelser, utbetalingToShow.trekk);
  const dato = formatToReadableDate(utbetalingToShow.ytelse_dato);
  const konto = utbetalingToShow.kontonummer;

  return (
    <>
      <div className={style.detaljer}>
        <div className={`${style.detaljerContainer} ${hasKommendeUtbetaling && style.kommendeUtbetaling}`}>
          <UtbetalingHeading type={hasKommendeUtbetaling ? "neste" : "siste"} language={language} />
          <Heading size="large">{sum.toLocaleString("no-nb") + " kr"}</Heading>
          <BodyLong>
            {dato} {text.konto[language]} {konto}
          </BodyLong>
        </div>
      </div>
      <UtbetalingYtelser
        isKommende={hasKommendeUtbetaling}
        ytelse={utbetalingToShow.ytelse}
        utbetaling={sum}
        id={utbetalingToShow.id}
      />
    </>
  );
};

export default UtbetalingContent;
