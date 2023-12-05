import useSWRImmutable from "swr/immutable";
import { BodyLong, Heading } from "@navikt/ds-react";
import { utbetalingsoversiktApiUrl } from "../utbetalingUrls.ts";
import { formatToReadableDate } from "@utils/utbetaling.ts";
import Ytelse from "@components/utbetaling/ytelse/Ytelse.tsx";
import UtbetalingHeading from "../heading/UtbetalingHeading.tsx";
import type { UtbetalingResponse } from "../utbetalingTypes.ts";
import { text } from "@language/utbetaling.ts";
import type { Language } from "@language/language.ts";
import { fetcher, include } from "@utils/api.client.ts";
import { Skeleton } from "@navikt/ds-react/cjs/skeleton";
import IngenUtbetaling from "../ingen/IngenUtbetaling.tsx";
import { setIsError } from "../../../store/store.ts";
import style from "./UtbetalingContent.module.css";

interface Props {
  language: Language;
}

const UtbetalingContent = ({ language }: Props) => {
  const { data, isLoading, error } = useSWRImmutable<UtbetalingResponse>({ path: utbetalingsoversiktApiUrl, options: include }, fetcher);

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
        <Ytelse isSkeleton={true} />
      </>
    );
  }

  if (error) {
    setIsError();
  }

  if (!data) {
    return null;
  }

  if (data.hasKommende) {
    return (
      <>
        <div className={style.detaljer}>
          <div className={`${style.detaljerContainer} ${style.kommendeUtbetaling}`}>
            <UtbetalingHeading type="neste" language={language} />
            <Heading size="large">
              {data.kommende?.utbetaling?.toLocaleString("no-nb") + " kr"}
            </Heading>
            <BodyLong>
              {formatToReadableDate(typeof data.kommende?.dato === "string" ? data.kommende?.dato : "")} {text.konto[language]} {data.kommende?.kontonummer}
            </BodyLong>
          </div>
        </div>
        <Ytelse
          isKommende={true}
          ytelse={data.kommende?.ytelse}
          utbetaling={data.kommende?.utbetaling}
          id={data.kommende?.id}
        />
      </>
    );
  }

  if (data.hasUtbetaling) {
    return (
      <>
        <div className={style.detaljer}>
          <div className={style.detaljerContainer}>
            <UtbetalingHeading type="siste" language={language} />
            <Heading size="large">
              {data.sisteUtbetaling?.utbetaling?.toLocaleString("no-nb") + " kr"}
            </Heading>
            <BodyLong>
              {formatToReadableDate(typeof data.sisteUtbetaling?.dato === "string" ? data.sisteUtbetaling?.dato : "")} {text.konto[language]} {data.sisteUtbetaling?.kontonummer}
            </BodyLong>
          </div>
        </div>
        <Ytelse
          isKommende={false}
          ytelse={data.sisteUtbetaling?.ytelse}
          utbetaling={data.sisteUtbetaling?.utbetaling}
          id={data.sisteUtbetaling?.id}
        />
      </>
    );
  }

  return <IngenUtbetaling language={language} />;
}

export default UtbetalingContent;
