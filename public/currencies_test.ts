import { anyArray, anyBoolean, anyString, expect, test } from "../dev_deps.ts";
import { fetchCurrencies } from "./currencies.ts";

test("fetchCurrencies", async () => {
  await expect(fetchCurrencies()).resolves.toEqual({
    code: 1000,
    trace: anyString(),
    message: "OK",
    data: {
      currencies: anyArray({
        id: anyString(),
        name: anyString(),
        withdraw_enabled: anyBoolean(),
        deposit_enabled: anyBoolean(),
      }),
    },
  });
});
