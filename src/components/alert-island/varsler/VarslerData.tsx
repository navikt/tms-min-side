import useSWRImmutable from "swr/immutable";
import { antallVarslerUrl } from "./varslerUrls";
import { fetcher } from "../../../utils/api.client";
import { Skeleton } from "@navikt/ds-react";

const VarslerData = () => {
  const { data , isLoading } = useSWRImmutable({ path: antallVarslerUrl }, fetcher);

  const antallOppgaver = data?.oppgaver;
  const antallBeskjeder = data?.beskjeder + data?.innbokser;
  const antallVarsler = antallOppgaver + antallBeskjeder;

  const hasOppgaver = antallOppgaver > 0;
  const hasBeskjeder = antallBeskjeder > 0;
  const hasVarsler = hasOppgaver || hasBeskjeder;

  if (!hasVarsler) {
    return <>{"Ingen nye varsler"}</>;
  }

  return <>{antallVarsler + " nye varsler"}</>;
};



export default VarslerData;
