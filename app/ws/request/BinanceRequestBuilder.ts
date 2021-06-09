import RequestBuilder from './RequestBuilder.ts';


class BinanceRequestBuilder implements RequestBuilder {
    subscribe(channel: string): string {
        // TODO map id to channel
        return `{"method": "SUBSCRIBE", "params": ["${channel}"], "id": 1}`
    }

    unsubscribe(channel: string): string {
        return `{"method": "UNSUBSCRIBE", "params": ["${channel}"], "id": 1}`
    }
}

export default BinanceRequestBuilder;
