import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";

export type SymbolDetailsResponse = SuccessResponse<{
  /** Array of trading pairs */
  symbols: {
    /** Trading pair name */
    symbol: `${string}_${string}`;

    /** Trading pair id */
    symbol_id: number;

    /** Base currency */
    base_currency: string;

    /** Quote currency */
    quote_currency: string;

    /** The minimum order quantity is also the minimum order quantity increment */
    quote_increment: number;

    /** Minimum order quantity */
    base_min_size: number;

    /** Maximum order quantity */
    base_max_size: number;

    /** Minimum price accuracy (decimal places), used to query k-line and depth */
    price_min_precision: number;

    /** Maximum price accuracy (decimal places), used to query k-line and depth */
    price_max_precision: number;

    /** Expiration time of trading pair */
    expiration: "NA";

    /** Minimum order amount */
    min_buy_amount: number;

    /** Maximum order amount */
    min_sell_amount: number;

    trade_status: "trading" | "pre-trade";
  }[];
}>;

const reviver: Reviver = (key, value) => {
  if (
    [
      "quote_increment",
      "base_min_size",
      "base_max_size",
      "min_buy_amount",
      "min_sell_amount",
    ]
      .includes(key) &&
    isString(value)
  ) {
    return Number(value);
  }
  return value;
};

/** Get a detailed list of all trading pairs on the platform.
 * ```ts
 * import { fetchSymbolDetails } from "https://deno.land/x/bitmart@$VERSION/mod.ts"
 * await fetchSymbolDetails()
 * ```
 * @see https://developer-pro.bitmart.com/en/spot/basic/symbols_detail.html
 */
export function fetchSymbolDetails(
  init?: RequestInit,
): Promise<SymbolDetailsResponse> {
  const url = new URL("spot/v1/symbols/details", BASE_URL);

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
