import useSWRImmutable from "swr/immutable"
import { redirectUrl, statusUrl } from "./urls";
import { fetcher } from "@utils/api.client";

export const reloadOnPageshow = () => {
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      location.reload();
    }
  });
};

const Authentication = () => {
  const { data } = useSWRImmutable({ path : statusUrl }, fetcher);

  reloadOnPageshow()
  if (data?.authenticated === false) {
    window.location.assign(redirectUrl)
  }
}

export default Authentication;