import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";

export type ContractOptions = {
  /** contract trading pair */
  contractSymbol: string;
};

export type ContractResponse = SuccessResponse<{
  tickers: {
    /** name of contract trading */
    contract_symbol: string;

    /** last price of contract */
    last_price: number;

    /** indexPrice of contract */
    index_price: number;

    /** last funding rate */
    last_funding_rate: number;

    /** The ratio of price increase and decrease in the last 24 hours */
    price_change_percent_24h: number;

    /** 24-hour volume */
    volume_24h: number;

    /** Link to the trading page on the BitMart website */
    url: string;

    high_price: number;
    low_price: number;
    legal_coin_price: number;
  }[];
}>;

const reviver: Reviver = (key, value) => {
  if (
    [
      "last_price",
      "index_price",
      "last_funding_rate",
      "price_change_percent_24h",
      "volume_24h",
      "high_price",
      "low_price",
      "legal_coin_price",
    ].includes(key) && isString(value)
  ) {
    return Number(value);
  }
  return value;
};

/** Get the latest market quotations of the contract.
 * ```ts
 * import { fetchContract } from "https://deno.land/x/bitmart@$VERSION/mod.ts"
 * await fetchContract()
 * ```
 * @see https://developer-pro.bitmart.com/en/contract/quotation/tickers.html
 */
export function fetchContract(
  options?: ContractOptions,
  init?: RequestInit,
): Promise<ContractResponse> {
  const url = new URL("contract/v1/tickers", BASE_URL);

  const _contractSymbol = options?.contractSymbol;

  if (_contractSymbol) {
    url.searchParams.set("contract_symbol", _contractSymbol);
  }

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
