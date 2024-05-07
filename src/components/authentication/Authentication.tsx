import { redirectUrl, statusUrl } from "./urls";
import { fetcher } from "@utils/api.client";
import useSWR from "swr";

const Authentication = () => {
  const { data } = useSWR({ path : statusUrl, cache: 'no-cache' }, fetcher);
  if (data?.authenticated === false) {
    window.location.assign(redirectUrl)
  }
}

export default Authentication;