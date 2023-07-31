import useSWRImmutable from "swr/immutable";
import { fetcher } from "../utils/api.client";

export const useManifest = (manifestUrl: string) => {
  const { data: manifest, isLoading: isLoadingManifest } = useSWRImmutable({ path: manifestUrl }, fetcher, {
    shouldRetryOnError: false,
  });

  return [manifest, isLoadingManifest];
};
