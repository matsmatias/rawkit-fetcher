interface RequestBuilder {
    subscribe(channel: string): string;
    unsubscribe(channel: string): string;
}

export default RequestBuilder;
