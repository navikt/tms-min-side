import useSWRImmutable from "swr/immutable"
import { redirectUrl, statusUrl } from "./urls";
import { fetcher } from "@utils/api.client";

const Authentication = () => {
  const { data } = useSWRImmutable({ path : statusUrl }, fetcher);
  console.log("--------------")
  if (data?.authenticated === false) {
    window.location.assign(redirectUrl)
  }
}

export default Authentication;