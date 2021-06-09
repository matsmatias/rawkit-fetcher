## About

Rawkit Fetcher is a Crypto ticker trade fetcher written in DenoJS. It aims to be an easily extensible application to facilitate reading trade/order data from multiple sources.
It ships out-of-the-box with trade data from Binance and Bitstamp.

## Recommended Versions

The application has been tested with Deno 1.10.3 and Redis 5.0.7.

## Prerequisites

* Have a Redis server running
* Configure Redis hostname and port on `app/config/app.ts`

## Running

```
deno run --allow-net ./main.js
```

## Adding Exchanges

* Implement `{Exchange}RequestBuilder extends RequestBuilder`, which should provide subscription and unsubscription payloads
* Implement `{Exchange}PayloadToTradeAdapter extends PayloadToTradeAdapter`, which should provide the logic to adapt the Exchange message payload to Fetcher's model (Trade)
* Add the exchange to `app/config/exchanges.ts`
* Create unit tests

## Adding Tickers

* Add the desired ticker to the array in `app/config/tickers.ts`

## Optional Steps

* For CORS purposes, set the frontend URL on `app/config/app.ts`
