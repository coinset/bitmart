import { anyArray, anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchSymbolDetails } from "./symbol_details.ts";
import { isSnakeCase } from "./_utils.ts";

test("fetchSymbolDetails", async () => {
  await expect(fetchSymbolDetails()).resolves.toEqual({
    code: 1000,
    trace: anyString(),
    message: "OK",
    data: {
      symbols: anyArray({
        symbol: anyString(isSnakeCase),
        symbol_id: anyNumber(),
        base_currency: anyString(),
        quote_currency: anyString(),
        quote_increment: anyNumber(),
        base_min_size: anyNumber(),
        base_max_size: anyNumber(),
        price_min_precision: anyNumber(),
        price_max_precision: anyNumber(),
        expiration: "NA",
        min_buy_amount: anyNumber(),
        min_sell_amount: anyNumber(),
      }),
    },
  });
});
