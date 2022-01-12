import { anyArray, anyString, expect, test } from "../dev_deps.ts";
import { fetchTickers } from "./tickers.ts";
import { tickerEquality } from "./ticker_test.ts";

test("fetchTickers", async () => {
  await expect(fetchTickers()).resolves.toEqual({
    code: 1000,
    trace: anyString(),
    message: "OK",
    data: {
      tickers: anyArray(tickerEquality),
    },
  });

  console.log(await fetchTickers());
});
