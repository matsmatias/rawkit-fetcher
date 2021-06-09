import { assertEquals, assertThrows, assertThrowsAsync } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Redis } from 'https://deno.land/x/redis@v0.22.1/redis.ts';

import ExchangeWebsocketConnector from '../../../app/ws/connection/ExchangeWebsocketConnector.ts';
import BinanceRequestBuilder from '../../../app/ws/request/BinanceRequestBuilder.ts';
import BinancePayloadToTradeAdapter from '../../../app/model/adapter/BinancePayloadToTradeAdapter.ts';


class RedisMock {
    publish(_channel: string, _message: string) {
        return 1;
    }
}

const redisMock = new RedisMock() as unknown as Redis;
const connector = new ExchangeWebsocketConnector(redisMock);

// Deno.test("shouldThrowExceptionsOnErrorCorrectly", () => {
    // const validExchange = {
    //     id: 'binance',
    //     websocketUrl: 'wss://stream.binance.com:9443/ws',
    //     tradeChannelTemplate: '|ticker-placeholder|@trade',
    //     requestBuilder: new BinanceRequestBuilder(),
    //     payloadToTradeAdapter: new BinancePayloadToTradeAdapter()
    // };

    // const invalidExchangeUrl = {
    //     id: 'binance',
    //     websocketUrl: 'wss://stream.binance.com:9443/invalid',
    //     tradeChannelTemplate: '|ticker-placeholder|@trade',
    //     requestBuilder: new BinanceRequestBuilder(),
    //     payloadToTradeAdapter: new BinancePayloadToTradeAdapter()
    // };

    // const invalidExchangeTradeChannelTemplate = {
    //     id: 'binance',
    //     websocketUrl: 'wss://stream.binance.com:9443/ws',
    //     tradeChannelTemplate: '|ticker-placeholder|@invalid',
    //     requestBuilder: new BinanceRequestBuilder(),
    //     payloadToTradeAdapter: new BinancePayloadToTradeAdapter()
    // };

    // const validTickers = ['ethbtc', 'ltcbtc', 'linkbtc'];

    // const invalidTickers = ['zzkkqq', 'invalid_ticker', 'tsla'];

    // // all these should throw exceptions
    // connector.connectToExchange(validExchange, invalidTickers);
    // connector.connectToExchange(invalidExchangeUrl, validTickers);
    // connector.connectToExchange(invalidExchangeUrl, invalidTickers);
    // connector.connectToExchange(invalidExchangeTradeChannelTemplate, validTickers);
    // connector.connectToExchange(invalidExchangeTradeChannelTemplate, invalidTickers);
// });

// Deno.test("shouldReconnectOnWebsocketClose", () => {

// });
