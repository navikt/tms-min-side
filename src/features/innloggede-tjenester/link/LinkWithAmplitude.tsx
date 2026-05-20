import type { Lenke } from "@src/features/innloggede-tjenester/innloggedeTjenesterUrls";
import style from "@src/features/innloggede-tjenester/section/InnloggedeTjensterSection.module.css";
import { logEvent } from "@src/shared/utils/client/umami.ts";
import type { Language } from "@src/shared/utils/server/language.ts";

interface Props {
  link: Lenke;
  language: Language;
}

const LinkWithAmplitude = ({ link, language }: Props) => (
  <a
    className={style.color}
    href={link.url[language]}
    onClick={() => logEvent("innloggede-tjenester-lenke", "innloggede-tjenester", link.nb)}
  >
    {link[language]}
  </a>
);

export default LinkWithAmplitude;
