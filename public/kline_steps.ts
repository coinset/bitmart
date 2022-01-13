import { jsonFetch, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";

export type KlineStepsResponse = SuccessResponse<{
  /** List of K-Line steps in minutes */
  steps: number[];
}>;

/** Get all k-line steps supported by the platform, expressed in minutes, minimum 1 minute.
 * ```ts
 * import { fetchKlineSteps } from "https://deno.land/x/bitmart@$VERSION/mod.ts"
 * await fetchKlineSteps()
 * ```
 * @see https://developer-pro.bitmart.com/en/spot/quotation/kline_step.html
 */
export function fetchKlineSteps(
  init?: RequestInit,
): Promise<KlineStepsResponse> {
  const url = new URL("spot/v1/steps", BASE_URL);

  return jsonFetch(url, init);
}
