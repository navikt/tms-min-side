import useSWRImmutable from "swr/immutable";
import { antallVarslerUrl } from "./varslerUrls.ts";
import { beskjedSingular, buildText, hasVarsler, oppgaveSingular } from "@utils/varsler.ts";
import type { Language } from "@language/language.ts";
import { text } from "@language/varsler.ts"
import IngenVarslerIkon from "./ikoner/IngenVarslerIkon";
import VarlserIkon from "./ikoner/VarslerIkon";
import { fetcher } from "@utils/api.client.ts";
import { logEvent } from "@utils/amplitude.ts";
import { varslerUrl } from "./varslerUrls.ts";
import { setIsError } from "../../../store/store.ts";
import style from "./Varsler.module.css";

interface Props {
  language: Language;
}

interface VarslerResponse {
  oppgaver: number;
  beskjeder: number;
  innbokser: number;
}

const Varsler = ({ language }: Props) => {
  const { data, isLoading, error } = useSWRImmutable<VarslerResponse>({ path: antallVarslerUrl }, fetcher);

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
      <a href={varslerUrl} className={style.varsler} onClick={() => logEvent("varsler", "generell", "Varsler")}>
        <IngenVarslerIkon />
        <div className={style.container}>
          <h3 className="navds-heading navds-heading--small">{text.varsler[language]}</h3>
          <p className="navds-body-long navds-body-long--small">
            {text.ingenVarsler[language]}
          </p>
        </div>
      </a>
    );
  }

  return (
    <a href={varslerUrl} className={style.varsler} onClick={() => logEvent("varsler", "generell", "Varsler")}>
      <VarlserIkon />
      <div className={style.container}>
        <h3 className="navds-heading navds-heading--small">{text.varsler[language]}</h3>
        <p className="navds-body-long navds-body-long--small">
          {varselText}
        </p>
      </div>
    </a>
  );
};

export default Varsler;
