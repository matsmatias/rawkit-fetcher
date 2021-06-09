import RequestBuilder from '../../ws/request/RequestBuilder.ts';
import PayloadToTradeAdapter from '../adapter/PayloadToTradeAdapter.ts';


interface Exchange {
    id: string;
    websocketUrl: string;
    requestBuilder: RequestBuilder;
    payloadToTradeAdapter: PayloadToTradeAdapter;

    getTradeChannelFromTicker(ticker: string): string;
}

export default Exchange;
