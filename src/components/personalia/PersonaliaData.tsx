import useSWRImmutable from "swr/immutable";
import { navnUrl } from "./personaliaUrls";
import { fetcher } from "@utils/api.client.ts";
import style from "./Personalia.module.css";

interface Personalia {
  navn: string;
  ident: string;
}

const PersonaliaData = () => {
  const { data: personalia, error } = useSWRImmutable<Personalia>({ path: navnUrl }, fetcher);

  if (!personalia || error) {
    return null;
  }

  return (
    <span className={style.navn}>{personalia.navn ? personalia.navn.toLowerCase() : personalia.ident}</span>
  );
};

export default PersonaliaData;
