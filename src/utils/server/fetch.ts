export const parseToJson = (response: Response) => {
  if (!response.ok) {
    console.error(`Error, fetch failed with status: ${response.status}`);
    return;
  }

  return response.json();
}