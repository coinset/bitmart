import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isNumber, isString } from "../deps.ts";

export type OrderBookOptions = {
  /** Trading pair symbol */
  symbol: `${string}_${string}`;

  /** Price precision, the range is defined in trading pair details */
  precision?: string;

  /** Number of results per request. The value can be transmitted [1-200], there are altogether [2-400] buying and selling depths */
  size?: number;
};

const reviver: Reviver = (key, value) => {
  if (["amount", "total", "price", "count"].includes(key) && isString(value)) {
    return Number(value);
  }
  return value;
};

type DepthData = {
  /** Total amount of current price depth */
  amount: number;

  /** Total accumulation above the current price depth (including current price) */
  total: number;

  /** The price at current depth */
  price: number;

  /** The number of orders at current depth */
  count: number;
};

export type OrderBookResponse = SuccessResponse<{
  /** Unix timestamp in milliseconds for when the last updated time occurred */
  timestamp: number;

  /** Bid order depth */
  buys: DepthData[];

  /** Ask order depth */
  sells: DepthData[];
}>;

/** Get full depth of trading pairs.
 * ```ts
 * import { fetchOrderBook } from "https://deno.land/x/bitmart@$VERSION/mod.ts"
 * await fetchOrderBook({ symbol: "BTC_USDT" })
 * ```
 * @see https://developer-pro.bitmart.com/en/spot/quotation/depth.html
 */
export function fetchOrderBook(
  { symbol, precision, size }: OrderBookOptions,
  init?: RequestInit,
): Promise<OrderBookResponse> {
  const url = new URL("spot/v1/symbols/book", BASE_URL);

  url.searchParams.set("symbol", symbol);

  if (isNumber(precision)) {
    url.searchParams.set("precision", String(precision));
  }

  if (isNumber(size)) {
    url.searchParams.set("size", String(size));
  }

  return jsonFetch(url, init, { parseJson: reviver });
}
