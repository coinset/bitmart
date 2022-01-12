import { jsonFetch, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";

export type CurrenciesResponse = SuccessResponse<{
  currencies: {
    /** Currency abbreviation, such as `BTC` */
    id: string;

    /** Currency full name, such as `Bitcoin` */
    name: string;

    /** Whether this currency can be withdrawn on the platform, true-can; false-no */
    withdraw_enabled: boolean;

    /** Whether this currency can be deposited on the platform, true-can; false-not */
    deposit_enabled: boolean;
  }[];
}>;

/** Get a list of all cryptocurrencies on the platform.
 * ```ts
 * import { fetchCurrencies } from "https://deno.land/x/bitmart@$VERSION/mod.ts"
 * await fetchCurrencies()
 * ```
 * @see https://developer-pro.bitmart.com/en/spot/basic/currencies.html
 */
export function fetchCurrencies(
  init?: RequestInit,
): Promise<CurrenciesResponse> {
  const url = new URL("spot/v1/currencies", BASE_URL);

  return jsonFetch(url, init);
}
