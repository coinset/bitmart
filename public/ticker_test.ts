import { anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchTicker } from "./ticker.ts";
import { isSnakeCase } from "./_utils.ts";

test("fetchTicker", async () => {
  await expect(fetchTicker({ symbol: "BTC_USDT" })).resolves.toEqual({
    code: 1000,
    trace: anyString(),
    message: "OK",
    data: {
      ticker: {
        symbol: anyString(isSnakeCase),
        last_price: anyNumber(),
        quote_volume_24h: anyNumber(),
        base_volume_24h: anyNumber(),
        high_24h: anyNumber(),
        low_24h: anyNumber(),
        open_24h: anyNumber(),
        close_24h: anyNumber(),
        best_ask: anyNumber(),
        best_ask_size: anyNumber(),
        best_bid: anyNumber(),
        best_bid_size: anyNumber(),
        fluctuation: anyNumber(),
        url: anyString(),
      },
    },
  });
});
