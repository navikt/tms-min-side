import style from "@src/features/innloggede-tjenester/section/InnloggedeTjensterSection.module.css";
import { logEvent } from "@src/shared/utils/client/umami.ts";
import type { Language } from "@src/shared/utils/server/language.ts";
import React from "react";

interface Link {
  nb: string;
  nn: string;
  en: string;
  url: {
    nb: string;
    nn: string;
    en: string;
  };
}

interface Props {
  link: Link;
  language: Language;
}

const LinkWithAmplitude = ({ link, language }: Props) => (
  <a
    className={style.color}
    href={link.url[language]}
    onClick={() => logEvent("innloggede-tjenester-lenke", "innloggede-tjenester", link["nb"])}
  >
    {link[language]}
  </a>
);

export default LinkWithAmplitude;
