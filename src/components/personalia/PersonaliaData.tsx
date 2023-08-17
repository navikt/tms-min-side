import style from "./Personalia.module.css";
import useSWRImmutable from "swr/immutable";
import { identUrl, navnUrl } from "./PersonaliaUrls";
import { fetcher } from "../../utils/api.client";

const PersonaliaData = () => {
  const { data: navn, error: navnError } = useSWRImmutable({ path: navnUrl }, fetcher);
  const { data: ident, error: identError } = useSWRImmutable({ path: identUrl }, fetcher);

  if ((!navn && !ident) || navnError) {
    return null;
  }

  const navnOrIdent = navnError ? ident?.ident : navn?.navn.toLowerCase();

  return (
    <span className={style.navn}>{navnOrIdent}</span>
  );
};

export default PersonaliaData;
