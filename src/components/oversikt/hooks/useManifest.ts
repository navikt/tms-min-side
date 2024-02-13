import useSWRImmutable from "swr/immutable";

const checkResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error("Fetch request failed");
  }
};

export const manifestFetcher = async (path: string) => {
  const response = await fetch(path, { method: "GET" });
  checkResponse(response);

  return response.json();
};

export const useManifest = (manifestUrl: string) => {
  const { data: manifest, isLoading: isLoadingManifest } = useSWRImmutable(manifestUrl, manifestFetcher);

  return [manifest, isLoadingManifest];
};
