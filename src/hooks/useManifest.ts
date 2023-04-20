import { useQuery } from "react-query";
import { manifestFetcher } from "../api/api";
import useStore, { selectSetIsError } from "../store/store";

export const useManifest = (manifestUrl: string) => {
  const { data: manifest, isLoading: isLoadingManifest } = useQuery(manifestUrl, manifestFetcher, {
    onError: useStore(selectSetIsError),
  });

  return [manifest, isLoadingManifest];
};
