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

### fetchSymbolDetails

Get a detailed list of all trading pairs on the platform.
[Docs](https://developer-pro.bitmart.com/en/spot/basic/symbols_detail.html)

example:

```ts
import { fetchSymbolDetails } from "https://deno.land/x/bitmart@$VERSION/mod.ts";
await fetchSymbolDetails();
```

returns:

```ts
type SymbolDetailsResponse = {
  code: 1000;
  trace: string;
  message: "OK";
  data: {
    symbols: {
      symbol: `${string}_${string}`;
      symbol_id: number;
      base_currency: string;
      quote_currency: string;
      quote_increment: number;
      base_min_size: number;
      base_max_size: number;
      price_min_precision: number;
      price_max_precision: number;
      expiration: "NA";
      min_buy_amount: number;
      min_sell_amount: number;
    }[];
  };
};
```

### fetchTicker

Ticker is an overview of the market status of a trading pair, including the
latest trade price, top bid and ask prices and 24-hour trading volume.
[Docs](https://developer-pro.bitmart.com/en/spot/quotation/ticker.html)

example:

```ts
import { fetchTicker } from "https://deno.land/x/bitmart@$VERSION/mod.ts";
await fetchTicker({ symbol: "BTC_USDT" });
```

parameters:

```ts
type TickerOptions = {
  symbol: `${string}_${string}`;
};
```

returns:

```ts
type TickerResponse = {
  code: 1000;
  trace: string;
  message: "OK";
  data: {
    ticker: {
      symbol: `${string}_${string}`;
      last_price: number;
      quote_volume_24h: number;
      base_volume_24h: number;
      high_24h: number;
      low_24h: number;
      open_24h: number;
      close_24h: number;
      best_ask: number;
      best_ask_size: number;
      best_bid: number;
      best_bid_size: number;
      fluctuation: number;
      url: string;
    };
  };
};
```

### fetchTickers

Ticker is an overview of the market status of a trading pair, including the
latest trade price, top bid and ask prices and 24-hour trading volume.
[Docs](https://developer-pro.bitmart.com/en/spot/quotation/ticker.html)

example:

```ts
import { fetchTickers } from "https://deno.land/x/bitmart@$VERSION/mod.ts";
await fetchTickers();
```

returns:

```ts
type TickersResponse = {
  code: 1000;
  trace: string;
  message: "OK";
  data: {
    tickers: {
      symbol: `${string}_${string}`;
      last_price: number;
      quote_volume_24h: number;
      base_volume_24h: number;
      high_24h: number;
      low_24h: number;
      open_24h: number;
      close_24h: number;
      best_ask: number;
      best_ask_size: number;
      best_bid: number;
      best_bid_size: number;
      fluctuation: number;
      url: string;
    }[];
  };
};
```

### fetchKlineSteps

Get all k-line steps supported by the platform, expressed in minutes, minimum 1
minute.
[Docs](https://developer-pro.bitmart.com/en/spot/quotation/kline_step.html)

example:

```ts
import { fetchKlineSteps } from "https://deno.land/x/bitmart@$VERSION/mod.ts";
await fetchKlineSteps();
```

returns:

```ts
type KlineStepsResponse = {
  code: 1000;
  trace: string;
  message: "OK";
  data: {
    steps: number[];
  };
};
```