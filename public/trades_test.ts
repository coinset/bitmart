import {
  anyArray,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchTrades } from "./trades.ts";

test("fetchTrades", async () => {
  await expect(fetchTrades({ symbol: "BTC_USDT" })).resolves.toEqual({
    code: 1000,
    trace: anyString(),
    message: "OK",
    data: {
      trades: anyArray({
        amount: anyNumber(),
        order_time: anyNumber(),
        price: anyNumber(),
        count: anyNumber(),
        type: anyOf(["buy", "sell"]),
      }),
    },
  });
});
