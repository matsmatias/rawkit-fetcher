import Trade from '../entity/Trade.ts';

import EventPayload from '../dto/EventPayload.ts';


interface PayloadToTradeAdapter {
    payloadToTrade(payload: Record<string, unknown>): Trade | undefined;
    validateRequiredFields(eventPayload: EventPayload): boolean;
}

export default PayloadToTradeAdapter;
