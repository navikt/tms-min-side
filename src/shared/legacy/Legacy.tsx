import { useLanguage } from "./useLanguage";
import { Language } from "../../utils/server/language";
import { useLogComposition } from "./useLogComposition";

interface Props {
  language: Language;
  url: string;
}

const Legacy = ({ language, url }: Props) => {
  useLanguage(language);
  useLogComposition(url);

  return null;
};

export default Legacy;
