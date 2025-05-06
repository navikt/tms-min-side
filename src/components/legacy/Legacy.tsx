import { useLanguage } from "./useLanguage";
import { Language } from "../../language/language";
import { useLogComposition } from "./useLogComposition";

interface Props {
  language: Language
}

const Legacy = ({ language }: Props) => {
  useLanguage(language);
  useLogComposition();

  return null;
};

export default Legacy;
