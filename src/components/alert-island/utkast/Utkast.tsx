import useSWRImmutable from "swr/immutable";
import UtkastIkon from "./ikoner/UtkastIkon.tsx";
import { fetcher } from "@utils/client/api.ts";
import { antallUtkastUrl, utkastUrl } from "./utkastUrls";
import type { Language } from "@language/language.ts";
import { text } from "@language/utkast.ts";
import { logEvent } from "@utils/client/amplitude.ts";
import { setIsError } from "../../../store/store.ts";
import UtkastIkonHover from "./ikoner/UtkastIkonHover.tsx";
import style from "./Utkast.module.css";

interface Props {
  language: Language;
}

const Utkast = ({ language }: Props) => {
  const { data: utkastAntall, isLoading: utkastLoading, error: utkastError } = useSWRImmutable({ path : antallUtkastUrl }, fetcher);

  const antall = (utkastAntall ? utkastAntall?.antall : 0);
  const hasUtkast = antall > 0;
  const ingress = antall === 1 ? text.soknad[language] : text.soknader[language](antall);

  if (utkastLoading) {
    return null;
  }

  if (utkastError) {
    setIsError();
  }

  if (!hasUtkast) {
    return null;
  }

  return (
    <div className={style.wrapper}>
      <a href={utkastUrl} className={style.utkast} onClick={() => logEvent("utkast", "generell", "Utkast")}>
        <div className={style.ikonRektangel}>
          <UtkastIkon />
          <UtkastIkonHover />
        </div>
        <div className={style.container}>
          <h3 className="navds-heading navds-heading--small">{text.utkast[language]}</h3>
          <p className="navds-body-long navds-body-long--small">
            {ingress}
          </p>
        </div>
      </a>
    </div>
  );
}

export default Utkast;
