import useSWRImmutable from "swr/immutable";
import { BodyLong, Heading } from "@navikt/ds-react";
import { utbetalingsoversiktApiUrl } from "../utbetalingUrls.ts";
import { formatToReadableDate } from "@utils/utbetaling.ts";
import Ytelser from "../ytelser/UtbetalingYtelser.tsx";
import UtbetalingHeading from "../heading/UtbetalingHeading.tsx";
import type { UtbetalingResponse } from "../utbetalingTypes.ts";
import { text } from "@language/utbetaling.ts";
import type { Language } from "@language/language.ts";
import { fetcher, include } from "@utils/api.client.ts";
import { Skeleton } from "@navikt/ds-react/cjs/skeleton";
import IngenUtbetaling from "../ingen/IngenUtbetaling.tsx";
import style from "./UtbetalingContent.module.css";

interface Props {
  language: Language;
}

const UtbetalingContent = ({ language }: Props) => {
  const { data, isLoading } = useSWRImmutable<UtbetalingResponse>({ path: utbetalingsoversiktApiUrl, options: include }, fetcher);

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
        <Ytelser isSkeleton={true} />
      </>
    );
  }

  if (!data) {
    return null;
  }

  const hasKommendeUtbetaling = data.hasKommende;
  const hasSisteUtbetaling = data.hasUtbetaling;

  if (!hasKommendeUtbetaling && !hasSisteUtbetaling) {
    return <IngenUtbetaling language={language} />;
  }

  const utbetaling = hasKommendeUtbetaling ? data.kommende?.utbetaling : data.sisteUtbetaling?.utbetaling;
  const dato = hasKommendeUtbetaling ? data.kommende?.dato : data.sisteUtbetaling?.dato;
  const konto = hasKommendeUtbetaling ? data.kommende?.kontonummer : data.sisteUtbetaling?.kontonummer;
  const ytelse = hasKommendeUtbetaling ? data.kommende?.ytelse : data.sisteUtbetaling?.ytelse;
  const id = hasKommendeUtbetaling ? data.kommende?.id : data.sisteUtbetaling?.id;

  return (
    <>
      <div className={style.detaljer}>
        <div className={`${style.detaljerContainer} ${hasKommendeUtbetaling && style.kommendeUtbetaling}`}>
          <UtbetalingHeading type={hasKommendeUtbetaling ? "neste" : "siste"} language={language} />
          <Heading size="large">{utbetaling?.toLocaleString("no-nb") + " kr"}</Heading>
          <BodyLong>
            {formatToReadableDate(typeof dato === "string" ? dato : "")} {text.konto[language]} {konto}
          </BodyLong>
        </div>
      </div>
      <Ytelser
        isKommende={hasKommendeUtbetaling}
        ytelse={ytelse}
        utbetaling={utbetaling}
        id={id}
      />
    </>
  );
};

export default UtbetalingContent;
