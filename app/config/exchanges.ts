import Exchange from '../model/entity/Exchange.ts';

import BinanceRequestBuilder from '../ws/request/BinanceRequestBuilder.ts';
import BinancePayloadToTradeAdapter from '../model/adapter/BinancePayloadToTradeAdapter.ts';
import BitstampRequestBuilder from '../ws/request/BitstampRequestBuilder.ts';
import BitstampPayloadToTradeAdapter from '../model/adapter/BitstampPayloadToTradeAdapter.ts';


export const EXCHANGES: Exchange[] = [
    {
        id: 'binance',
        websocketUrl: 'wss://stream.binance.com:9443/ws',
        requestBuilder: new BinanceRequestBuilder(),
        payloadToTradeAdapter: new BinancePayloadToTradeAdapter(),

        getTradeChannelFromTicker(ticker: string): string {
            return `${ticker}@trade`;
        }
    },
    {
        id: 'bitstamp',
        websocketUrl: 'wss://ws.bitstamp.net',
        requestBuilder: new BitstampRequestBuilder(),
        payloadToTradeAdapter: new BitstampPayloadToTradeAdapter(),

        getTradeChannelFromTicker(ticker: string): string {
            return `live_trades_${ticker}`;
        }
    }
];
