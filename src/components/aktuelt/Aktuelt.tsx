import useSWRImmutable from "swr/immutable";
import MicrofrontendWrapper from "../din-oversikt/MicrofrontendWrapper.tsx";
import { fetcher, include } from "@utils/client/api.ts";
import { BodyShort } from "@navikt/ds-react";
import { Microfrontend, PersonalizedContent } from "../din-oversikt/microfrontendTypes.tsx";
import { text } from "@language/aktuelt.ts";
import { setIsError } from "src/store/store";
import { dinOversiktLegacyUrl } from "../legacy/urls";
import type { Language } from "@language/language.ts";
import style from "./Aktuelt.module.css";

interface Props {
  language: Language;
}

const Aktuelt = ({ language }: Props) => {
  const { data, isLoading } = useSWRImmutable<PersonalizedContent>(
    { path: dinOversiktLegacyUrl, options: include },
    fetcher,
    {
      onError: () => setIsError(),
    },
  );

  const aktuelt = data?.aktuelt;

  if (isLoading || aktuelt == null || aktuelt?.length === 0) return null;

  return (
    <div className={style.container}>
      <BodyShort as="h2" className={style["aktuelt"]} spacing>
        {text.aktuelt[language]}
      </BodyShort>
      {aktuelt?.map((microfrontend: Microfrontend) => (
        <MicrofrontendWrapper key={microfrontend.microfrontend_id} manifestUrl={microfrontend.url} />
      ))}
    </div>
  );
};

export default Aktuelt;
