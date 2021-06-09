import RequestBuilder from './RequestBuilder.ts';


class BitstampRequestBuilder implements RequestBuilder {
    subscribe(channel: string): string {
        return `{"event": "bts:subscribe", "data": {"channel": "${channel}"}}`
    }

    unsubscribe(channel: string): string {
        return `{"event": "bts:unsubscribe", "data": {"channel": "${channel}"}}`
    }
}

export default BitstampRequestBuilder;
