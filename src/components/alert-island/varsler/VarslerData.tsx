import useSWRImmutable from "swr/immutable";
import { antallVarslerUrl } from "./varslerUrlsClientSide";
import { fetcher } from "../../../utils/api.client";
import { beskjedSingular, buildText, hasVarsler, oppgaveSingular } from "./varslerUtlis";
import { text } from "./varslerText"
import type { Language } from "../../../language/language";

interface Props {
  language: Language;
}

const VarslerData = ({ language }: Props) => {
  const { data, isLoading } = useSWRImmutable({ path: antallVarslerUrl }, fetcher);

  if (isLoading) {
    return null;
  }

  const oppgaver = data.oppgaver;
  const beskjeder = data.beskjeder + data.innbokser;
  const varsler = beskjeder + oppgaver;

  const oppgaveText = oppgaveSingular(oppgaver) ? text.oppgave[language] : text.oppgaver[language];
  const beskjedText = beskjedSingular(beskjeder) ? text.beskjed[language] : text.beskjeder[language];
  const varselText = buildText(beskjeder, oppgaver, beskjedText, oppgaveText, text.og[language]);

  if (!hasVarsler(varsler)) {
    return <>{"Ingen nye varsler"}</>;
  }

  return <>{`${varsler} ${varselText}`}</>;
};

export default VarslerData;
