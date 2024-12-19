import useSWRImmutable from "swr/immutable";
import { varselApiUrl } from "./varslerUrls.ts";
import { beskjedSingular, buildText, hasVarsler, oppgaveSingular } from "@utils/client/varsler.ts";
import type { Language } from "@language/language.ts";
import { text } from "@language/varsler.ts"
import IngenVarslerIkon from "./ikoner/IngenVarslerIkon";
import VarlserIkon from "./ikoner/VarslerIkon";
import { fetcher } from "@utils/client/api.ts";
import { logEvent } from "@utils/client/amplitude.ts";
import { varslerUrl } from "./varslerUrls.ts";
import { setIsError } from "../../../store/store.ts";
import style from "./Varsler.module.css";
import VarselBjelleDotMedFyll from "./ikoner/VarselBjelleDotMedFyll.tsx";
import VarselBjelleDotUtenFyll from "./ikoner/VarselBjelleDotUtenFyll.tsx";

interface Props {
  language: Language;
}

interface VarslerResponse {
  oppgaver: number;
  beskjeder: number;
  innbokser: number;
}

const Varsler = ({ language }: Props) => {
  const { data, isLoading, error } = useSWRImmutable<VarslerResponse>({ path: varselApiUrl }, fetcher);

  if (isLoading) {
    return null;
  }

  if (error) {
    setIsError();
  }

  if (!data) {
    return null;
  }

  const oppgaver = data.oppgaver || 0;
  const beskjeder = data.beskjeder + data.innbokser;
  const varsler = beskjeder + oppgaver;

  const oppgaveText = oppgaveSingular(oppgaver) ? text.oppgave[language] : text.oppgaver[language];
  const beskjedText = beskjedSingular(beskjeder) ? text.beskjed[language] : text.beskjeder[language];
  const varselText = buildText(beskjeder, oppgaver, beskjedText, oppgaveText, text.og[language]);

  if (!hasVarsler(varsler)) {
    return (
      <div className={style.wrapper}>
        <a href={varslerUrl} className={style.varsler} onClick={() => logEvent("varsler", "generell", "Varsler")}>
          <IngenVarslerIkon />
          <div className={style.container}>
            <h3 className="navds-heading navds-heading--small">{text.varsler[language]}</h3>
            <p className="navds-body-long navds-body-long--small">
              {text.ingenVarsler[language]}
            </p>
          </div>
        </a>
      </div>
    );
  }

  return (
    <div className={style.wrapper}>
      <a href={varslerUrl} className={style.varsler} onClick={() => logEvent("varsler", "generell", "Varsler")}>
        <div className={style.ikonRektangel}>
          <VarselBjelleDotMedFyll />
          <VarselBjelleDotUtenFyll />
        </div>
        <div className={style.container}>
          <h3 className="navds-heading navds-heading--small">{text.varsler[language]}</h3>
          <p className="navds-body-long navds-body-long--small">
            {varselText}
          </p>
        </div>
      </a>
    </div>
  );
};

export default Varsler;
