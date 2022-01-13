import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isNumber, isString } from "../deps.ts";

export type KlineOptions = {
  /** Trading pair symbol */
  symbol: `${string}_${string}`;

  /** Start timestamp (in seconds, UTC+0 TimeZome) */
  from: number;

  /** End timestamp (in seconds, UTC+0 TimeZome */
  to: number;

  /** k-line step Steps (in minutes)
   * @default 1
   */
  step?: number;
};

export type KlineResponse = SuccessResponse<{
  /** K-Line data */
  kline: {
    /** Timestamp (in seconds, UTC+0 TimeZome) */
    timestamp: number;

    /** Open price */
    open: number;

    /** Highest price */
    high: number;

    /** Lowest price */
    low: number;

    /** Close price */
    close: number;

    /** Current price */
    last_price: number;

    /** Total volume */
    volume: number;

    /** Transaction amount */
    quote_volume: number;
  }[];
}>;

const reviver: Reviver = (key, value) => {
  if (
    ["open", "high", "low", "close", "last_price", "volume", "quote_volume"]
      .includes(key) && isString(value)
  ) {
    return Number(value);
  }
  return value;
};

/** Get k-line data within a specified time range of a specified trading pair.
 * ```ts
 * import { fetchKline } from "https://deno.land/x/bitmart@$VERSION/mod.ts"
 * await fetchKline({ symbol: "BTC_USDT", from: 1525760116 to: 1525760117 });
 * ```
 * @see https://developer-pro.bitmart.com/en/spot/quotation/kline.html
 */
export function fetchKline(
  { symbol, from, to, step }: KlineOptions,
  init?: RequestInit,
): Promise<KlineResponse> {
  const url = new URL("spot/v1/symbols/kline", BASE_URL);

  url.searchParams.set("symbol", symbol);
  url.searchParams.set("from", String(from));
  url.searchParams.set("to", String(to));

  if (isNumber(step)) {
    url.searchParams.set("step", String(step));
  }

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
