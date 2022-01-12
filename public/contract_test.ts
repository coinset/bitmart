import { anyArray, anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchContract } from "./contract.ts";
test("fetchContract", async () => {
  const equality = {
    code: 1000,
    trace: anyString(),
    message: "OK",
    data: {
      tickers: anyArray({
        contract_symbol: anyString(),
        last_price: anyNumber(),
        index_price: anyNumber(),
        last_funding_rate: anyNumber(),
        price_change_percent_24h: anyNumber(),
        volume_24h: anyNumber(),
        url: anyString(),
        high_price: anyNumber(),
        low_price: anyNumber(),
        legal_coin_price: anyNumber(),
      }),
    },
  };
  await expect(fetchContract()).resolves.toEqual(equality);

  await expect(fetchContract({ contractSymbol: "ETHUSDT" })).resolves.toEqual(
    equality,
  );
});
