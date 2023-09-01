import React from "react";
import { Detail } from "@navikt/ds-react/cjs/typography/Detail.js";
import { BodyShort } from "@navikt/ds-react/cjs/typography/BodyShort.js";
import type { Language } from "../../../language/language";
import ChevronRight from "./ChevronRight";
import style from "./InnloggedeTjensterSection.module.css";

interface Props  {
  liste: Array<{ nb: string, nn: string, en: string, url: { nb: string, nn: string, en: string } }>, tittel: string, language: Language
}

const InnloggedeTjensterSection = ({ liste, tittel, language }: Props) => {
  return(
    <div className={style.listeContainer}>
      <Detail className={style.listeTittel}>{tittel}</Detail>
      <ul className={style.liste}>
        {liste.map((link) => (
          <li className={style.link}>
            <ChevronRight />
            <BodyShort>
              <a href={link.url[language]} className={style.color}>
                {link[language]}
              </a>
            </BodyShort>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InnloggedeTjensterSection;
