import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";

export type TickerOptions = {
  /** Trading pair symbol */
  symbol: `${string}_${string}`;
};

type TickerData = {
  /** Trading pair */
  symbol: `${string}_${string}`;

  /** Latest price */
  last_price: number;

  /** 24-hour trade volume in quote currency */
  quote_volume_24h: number;

  /** 24-hour trade volume in base currency */
  base_volume_24h: number;

  /** 24-hour highest price */
  high_24h: number;

  /** 24-hour lowest price */
  low_24h: number;

  /** 24-hour open price */
  open_24h: number;

  /** 24-hour close price */
  close_24h: number;

  /** Top ask price */
  best_ask: number;

  /** Size of top ask order */
  best_ask_size: number;

  /** Top bid price */
  best_bid: number;

  /** Size of top bid order */
  best_bid_size: number;

  fluctuation: number;

  /** Link to the trading page on BitMart */
  url: string;
};

const reviver: Reviver = (key, value) => {
  if (
    [
      "last_price",
      "quote_volume_24h",
      "base_volume_24h",
      "high_24h",
      "low_24h",
      "open_24h",
      "close_24h",
      "best_ask",
      "best_ask_size",
      "best_bid",
      "best_bid_size",
      "fluctuation",
    ]
      .includes(key) && isString(value)
  ) {
    return Number(value);
  }
  return value;
};

export type TickerResponse = SuccessResponse<{
  ticker?: TickerData;
}>;

/** Ticker is an overview of the market status of a trading pair, including the latest trade price, top bid and ask prices and 24-hour trading volume.
 * ```ts
 * import { fetchTicker } from "https://deno.land/x/bitmart@$VERSION/mod.ts"
 * await fetchTicker({symbol: "BTC_USDT" })
 * ```
 * @see https://developer-pro.bitmart.com/en/spot/quotation/ticker.html
 */
export async function fetchTicker(
  { symbol }: TickerOptions,
  init?: RequestInit,
): Promise<TickerResponse> {
  const url = new URL("spot/v1/ticker", BASE_URL);

  url.searchParams.set("symbol", symbol);

  const { data: { tickers: [ticker] }, ...rest } = await jsonFetch<
    SuccessResponse<{
      tickers: TickerData[];
    }>
  >(url, init, {
    parseJson: reviver,
  });

  return {
    ...rest,
    data: {
      ticker,
    },
  };
}

export type { TickerData };
export { reviver };
