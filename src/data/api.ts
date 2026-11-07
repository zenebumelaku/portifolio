export const readApiError = async (response: Response) => {
  const body: unknown = await response.json().catch(() => null);
  if (
    typeof body === "object" &&
    body !== null &&
    "error" in body &&
    typeof body.error === "string"
  ) {
    return body.error;
  }
  return `Request failed (${response.status}).`;
};

export const apiFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (!response.ok) throw new Error(await readApiError(response));
  return response;
};
