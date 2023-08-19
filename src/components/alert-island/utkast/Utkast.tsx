import UtkastIkon from "./UtkastIkon";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../../utils/api.client";
import { antallUtkastDigisosUrl, antallUtkastUrl, utkastUrl } from "./utkastUrls";
import { text } from "./utkastText";
import style from "./Utkast.module.css";
import type { Language } from "../../../language/language";

interface Props {
  language: Language;
}

const Utkast = ({ language }: Props) => {
  const { data: utkastAntall, isLoading: utkastLoading } = useSWRImmutable({ path : antallUtkastUrl }, fetcher);
  const { data: digisosAntall, isLoading: digisosLoading } = useSWRImmutable({ path: antallUtkastDigisosUrl }, fetcher);

  const antall = (utkastAntall ? utkastAntall?.antall : 0) + (digisosAntall ? digisosAntall?.antall : 0);
  const ingress = antall === 1 ? text.soknad[language] : text.soknader[language];
  const hasUtkast = antall > 0;

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
    <a href={utkastUrl} className={style.utkast}>
      <UtkastIkon />
      <div className={style.container}>
        <h3 className="navds-heading navds-heading--small">{text.utkast[language]}</h3>
        <p className="navds-body-long">
          {`${antall} ${ingress}`}
        </p>
      </div>
    </a>
  );
}

export default Utkast;



