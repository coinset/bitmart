import { jsonFetch, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { reviver, TickerData } from "./ticker.ts";

export type TickersResponse = SuccessResponse<{
  tickers: TickerData[];
}>;

/** Ticker is an overview of the market status of a trading pair, including the latest trade price, top bid and ask prices and 24-hour trading volume.
 * ```ts
 * import { fetchTickers } from "https://deno.land/x/bitmart@$VERSION/mod.ts"
 * await fetchTickers()
 * ```
 * @note The fetched data is cached for 5 minutes.
 * @see https://developer-pro.bitmart.com/en/spot/quotation/ticker.html
 */
export function fetchTickers(
  init?: RequestInit,
): Promise<TickersResponse> {
  const url = new URL("spot/v1/ticker", BASE_URL);

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}

export { reviver };
