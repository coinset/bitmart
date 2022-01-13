import { anyArray, anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchOrderBook } from "./order_book.ts";

test("fetchOrderBook", async () => {
  const depthEquality = {
    amount: anyNumber(),
    total: anyNumber(),
    price: anyNumber(),
    count: anyNumber(),
  };
  await expect(fetchOrderBook({ symbol: "BTC_USDT" })).resolves.toEqual({
    code: 1000,
    trace: anyString(),
    message: "OK",
    data: {
      timestamp: anyNumber(),
      buys: anyArray(depthEquality),
      sells: anyArray(depthEquality),
    },
  });
});
