import { anyArray, anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchKline } from "./kline.ts";

test("fetchKline", async () => {
  await expect(
    fetchKline({
      symbol: "BTC_USDT",
      from: 1525760116,
      to: 1525760117,
    }),
  ).resolves.toEqual({
    code: 1000,
    trace: anyString(),
    message: "OK",
    data: {
      klines: anyArray({
        timestamp: anyNumber(),
        open: anyNumber(),
        high: anyNumber(),
        low: anyNumber(),
        close: anyNumber(),
        last_price: anyNumber(),
        volume: anyNumber(),
        quote_volume: anyNumber(),
      }),
    },
  });
});
