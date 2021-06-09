import EventData from './EventData.ts';


/* Per https://www.bitstamp.net/websocket/v2/ */
class BitstampEventData extends EventData {
    channel!: string;
    event!: string;
    tradeData!: {
        amount: number;
        id: string;
        price: number;
        microtimestamp: string;
        type: number;
    };
}

export default BitstampEventData;
