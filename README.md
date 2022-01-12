# @coinset/bitmart

Universal BitMart API client

:children_crossing: This is not official

## Public API

A request for an entry point that does not require authentication.

### fetchContract

Get the latest market quotations of the contract.
[Docs](https://developer-pro.bitmart.com/en/contract/quotation/tickers.html)

example:

```ts
import { fetchContract } from "https://deno.land/x/bitmart@$VERSION/mod.ts";
await fetchContract();
```

parameters:

```ts
type ContractOptions = {
  contractSymbol: string;
};
```

returns:

```ts
type ContractResponse = {
  code: 1000;
  trace: string;
  message: "OK";
  data: {
    tickers: {
      contract_symbol: string;
      last_price: number;
      index_price: number;
      last_funding_rate: number;
      price_change_percent_24h: number;
      volume_24h: number;
      url: string;
      high_price: number;
      low_price: number;
      legal_coin_price: number;
    }[];
  };
};
```

### fetchCurrencies

Get a list of all cryptocurrencies on the platform.
[Docs](https://developer-pro.bitmart.com/en/spot/basic/currencies.html)

example:

```ts
import { fetchCurrencies } from "https://deno.land/x/bitmart@$VERSION/mod.ts";
await fetchCurrencies();
```

returns:

```ts
type CurrenciesResponse = {
  code: 1000;
  trace: string;
  message: "OK";
  data: {
    currencies: {
      id: string;
      name: string;
      withdraw_enabled: boolean;
      deposit_enabled: boolean;
    }[];
  };
};
```

### fetchSymbols

Get a list of all trading pairs on the platform.
[Docs](https://developer-pro.bitmart.com/en/spot/basic/symbols.html)

example:

```ts
import { fetchSymbols } from "https://deno.land/x/bitmart@$VERSION/mod.ts";
await fetchSymbols();
```

returns:

```ts
type SymbolsResponse = {
  code: 1000;
  trace: string;
  message: "OK";
  data: {
    symbols: `${string}_${string}`[];
  };
};
```
