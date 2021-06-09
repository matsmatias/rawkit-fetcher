import EventData from './EventData.ts';


/* Per https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md#trade-streams */
class BinanceEventData extends EventData {
    e!: string;         // Event type
    E!: number;         // Event time
    s!: string;         // Symbol
    t!: number;         // Trade ID
    p!: string;         // Price
    q!: string;         // Quantity
    T!: number;         // Trade time
}

export default BinanceEventData;
