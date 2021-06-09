import EventPayload from './EventPayload.ts';
import BinanceEventData from './BinanceEventData.ts';


export class BinanceEventPayload implements EventPayload {
    timeStamp!: number;
    type!: string;
    eventData!: BinanceEventData;

    constructor() {
        this.eventData = new BinanceEventData();
    }
}

export default BinanceEventPayload;
