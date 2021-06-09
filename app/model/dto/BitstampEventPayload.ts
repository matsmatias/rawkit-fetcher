import EventPayload from './EventPayload.ts';
import BitstampEventData from './BitstampEventData.ts';


export class BitstampEventPayload implements EventPayload {
    timeStamp!: number;
    type!: string;
    eventData!: BitstampEventData;

    constructor() {
        this.eventData = new BitstampEventData();
    }
}

export default BitstampEventPayload;
