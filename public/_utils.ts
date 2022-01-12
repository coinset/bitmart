export type Reviver = Parameters<typeof JSON.parse>[1];

export const jsonFetch = async <T>(
  url: RequestInfo | URL,
  init?: RequestInit,
  options?: { parseJson: Reviver },
): Promise<T> => {
  const res = await fetch(url.toString(), init);

  if (!res.ok) {
    throw Error(res.statusText);
  }

  const text = await res.text();
  const parsed = JSON.parse(text, options?.parseJson);

  if ("code" in parsed && parsed.code !== 1000) {
    throw Error(parsed.message);
  }

  return parsed;
};

export type SuccessResponse<Data> = {
  code: 1000;
  trace: string;
  message: "OK";
  data: Data;
};

export function isSnakeCase(value: string): boolean {
  return /\w+_\w+/.test(value);
}
