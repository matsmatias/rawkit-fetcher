import { WebSocketClient, StandardWebSocketClient } from "https://deno.land/x/websocket@v0.1.2/mod.ts";
import { Redis } from 'https://deno.land/x/redis@v0.22.1/redis.ts';

import Exchange from '../../model/entity/Exchange.ts';

// TODO unit test
class ExchangeWebsocketConnector {

    redis: Redis;

    constructor(redis: Redis) {
        this.redis = redis;
    }

    connectToExchange(exchange: Exchange, tickers: string[]): void {
        const ws: WebSocketClient = new StandardWebSocketClient(exchange.websocketUrl);

        ws.on("open", () => {
          console.log(`WebSocket connected to exchange '${exchange.id}'`);
          
          tickers.forEach(function(ticker: string) {
            const channel = exchange.getTradeChannelFromTicker(ticker);
            console.log(`Subscribing to channel '${exchange.id}:${channel}'`);
            ws.send(exchange.requestBuilder.subscribe(channel));
          });
        });
        
        ws.on("message", (payload: Record<string, unknown>) => {
          const trade = exchange.payloadToTradeAdapter.payloadToTrade(payload);
          if (trade) {
            this.redis.publish(`trade:${exchange.id}:${trade.symbol}`, JSON.stringify(trade));
            console.log(trade);
          }
        });
      
        // TODO ws.on "close"
        // ws.on("close", () => {
        //   let tries = 1;
        //   console.log(`WebSocket closed from exchange '${exchange.id}', trying to reconnect. . . [${tries}]`);
        // });

        // TODO ws.on "error"
      
        // TODO pong every x seconds
      
        // TODO reconnect if disconnected (test with binance api, 24h connection limit)
    }
}

export default ExchangeWebsocketConnector;
