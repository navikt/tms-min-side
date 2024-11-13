import { BodyLong, Heading } from "@navikt/ds-react";
import { formatToReadableDate } from "@utils/client/utbetaling.ts";
import Ytelse from "@components/utbetaling/ytelse/Ytelse.tsx";
import UtbetalingHeading from "../heading/UtbetalingHeading.tsx";
import { text } from "@language/utbetaling.ts";
import type { Language } from "@language/language.ts";
import IngenUtbetaling from "../ingen/IngenUtbetaling.tsx";
import style from "./UtbetalingContent.module.css";

interface Props {
  language: Language;
}

const UtbetalingContent = ({ language }: Props) => {
  const data = {
    "hasKommende": false,
    "hasUtbetaling": true,
    "sisteUtbetaling": {
      "utbetaling": 1234,
      "dato": "2023-11-14",
      "ytelse": "Arbeidsavklaringspenger",
      "kontonummer": 1234,
      "id": 1233
    },
    "kommende": {
      "utbetaling": 1234,
      "dato": "2023-11-14",
      "ytelse": "Arbeidsavklaringspenger",
      "kontonummer": 1234,
      "id": 1233
    }
  };

  if (data?.hasKommende) {
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

  if (data?.hasUtbetaling) {
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
