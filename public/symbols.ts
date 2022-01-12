import { jsonFetch, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";

export type SymbolsResponse = SuccessResponse<{
  /** Array of trading pairs */
  symbols: `${string}_${string}`[];
}>;

/** Get a list of all trading pairs on the platform.
 * ```ts
 * import { fetchSymbols } from "https://deno.land/x/bitmart@$VERSION/mod.ts"
 * await fetchSymbols()
 * ```
 * @see https://developer-pro.bitmart.com/en/spot/basic/symbols.html
 */
export function fetchSymbols(
  init?: RequestInit,
): Promise<SymbolsResponse> {
  const url = new URL("spot/v1/symbols", BASE_URL);

  return jsonFetch(url, init);
}
