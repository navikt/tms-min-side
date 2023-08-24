import React from "react";
import DS from "@navikt/ds-react";
import type { Language } from "../../language/language";
import style from "./InnloggedeTjensterSection.module.css";

const InnloggedeTjensterSection = ({ liste, tittel, language }: { liste: Array<{ nb: string, nn: string, en: string, url: {nb: string, nn: string, en: string} }>, tittel: string, language: Language }) => {
  return(
    <>
      <div className={style.listeContainer}>
        <DS.Detail className={style.listeTittel}>{tittel}</DS.Detail>
        <ul className={style.liste}>
          {liste.map((link) => (
            <li className={style.lenke}>
              <DS.BodyShort>
                <a href={link.url[language]} className={style.color}>
                  {link[language]}
                </a>
              </DS.BodyShort>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default InnloggedeTjensterSection;
