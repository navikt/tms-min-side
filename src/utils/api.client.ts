export const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Fetch request failed");
  }

  return await response.json();
};
