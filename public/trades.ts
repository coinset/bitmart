import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isNumber, isString } from "../deps.ts";

export type TradesOptions = {
  /** Trading pair symbol */
  symbol: `${string}_${string}`;

  /** Number of returned items, the default maximum is `50` */
  n?: number;
};

export type TradesResponse = SuccessResponse<{
  /** List of trades */
  trades: {
    /** Total trade value */
    amount: number;

    /** Trade time (in milliseconds) */
    order_time: number;

    /** Trade price */
    price: number;

    /** Trade amount */
    count: number;

    /** Order type */
    type: "buy" | "sell";
  }[];
}>;

const reviver: Reviver = (key, value) => {
  if (["amount", "price", "count"].includes(key) && isString(value)) {
    return Number(value);
  }
  return value;
};

/** Get the latest trade records of the specified trading pair.
 * ```ts
 * import { fetchTrades } from "https://deno.land/x/bitmart@$VERSION/mod.ts"
 * await fetchTrades({ symbol: "BTC_USDT" })
 * ```
 * @see https://developer-pro.bitmart.com/en/spot/quotation/trades.html
 */
export function fetchTrades(
  { symbol, n }: TradesOptions,
  init?: RequestInit,
): Promise<TradesResponse> {
  const url = new URL("spot/v1/symbols/trades", BASE_URL);

  url.searchParams.set("symbol", symbol);
  if (isNumber(n)) {
    url.searchParams.set("N", String(n));
  }

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
