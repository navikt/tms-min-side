import React from "react";
import { logEvent } from "@utils/client/amplitude.ts";
import type { Language } from "@language/language.ts";
import style from "../section/InnloggedeTjensterSection.module.css";

interface Link {
  nb: string;
  nn: string;
  en: string;
  url: {
    nb: string,
    nn: string;
    en: string;
  }
}

interface Props {
  link: Link;
  language: Language;
}

const LinkWithAmplitude = ({ link, language }: Props) => (
  <a className={style.color} href={link.url[language]} onClick={() => logEvent("innloggede-tjenester-lenke", "innloggede-tjenester", link["nb"])}>
    {link[language]}
  </a>
);

export default LinkWithAmplitude;
