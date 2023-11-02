import useSWRImmutable from "swr/immutable";
import UtkastIkon from "./UtkastIkon";
import { fetcher } from "@utils/api.client.ts";
import { antallUtkastDigisosUrl, antallUtkastUrl, utkastUrl } from "./utkastUrls";
import type { Language } from "@language/language.ts";
import { text } from "@language/utkast.ts";
import { logEvent } from "@utils/amplitude.ts";
import style from "./Utkast.module.css";

interface Props {
  language: Language;
}

const Utkast = ({ language }: Props) => {
  const { data: utkastAntall, isLoading: utkastLoading } = useSWRImmutable({ path : antallUtkastUrl }, fetcher);
  const { data: digisosAntall, isLoading: digisosLoading } = useSWRImmutable({ path: antallUtkastDigisosUrl }, fetcher);

  const antall = (utkastAntall ? utkastAntall?.antall : 0) + (digisosAntall ? digisosAntall?.antall : 0);
  const hasUtkast = antall > 0;
  const ingress = antall === 1 ? text.soknad[language] : text.soknader[language];

  if (utkastLoading) {
    return null;
  }

  if (digisosLoading) {
    return null;
  }

  if (!hasUtkast) {
    return null;
  }

  return (
    <a href={utkastUrl} className={style.utkast} onClick={() => logEvent("utkast", "generell", "Utkast")}>
      <UtkastIkon />
      <div className={style.container}>
        <h3 className="navds-heading navds-heading--small">{text.utkast[language]}</h3>
        <p className="navds-body-long navds-body-long--small">
          {`${antall} ${ingress}`}
        </p>
      </div>
    </a>
  );
}

export default Utkast;
