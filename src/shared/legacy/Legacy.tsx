import { useLanguage } from "./useLanguage";
import { Language } from "../../utils/server/language";
import { useLogComposition } from "./useLogComposition";

interface Props {
  language: Language;
}

const Legacy = ({ language }: Props) => {
  useLanguage(language);
  useLogComposition();

  return null;
};

export default Legacy;
