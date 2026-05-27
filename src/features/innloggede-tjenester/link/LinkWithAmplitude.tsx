import type { Lenke } from "@src/features/innloggede-tjenester/innloggedeTjenesterUrls";
import style from "@src/features/innloggede-tjenester/section/InnloggedeTjensterSection.module.css";
import { logEvent } from "@src/shared/utils/client/umami.ts";
import type { Locale } from "@src/shared/utils/server/locale.ts";

interface Props {
  link: Lenke;
  locale: Locale;
}

const LinkWithAmplitude = ({ link, locale }: Props) => (
  <a
    className={style.color}
    href={link.url[locale]}
    onClick={() => logEvent("innloggede-tjenester-lenke", "innloggede-tjenester", link.nb)}
  >
    {link[locale]}
  </a>
);

export default LinkWithAmplitude;
