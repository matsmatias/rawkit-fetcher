import PayloadToTradeAdapter from './PayloadToTradeAdapter.ts';

import BitstampEventPayload from '../dto/BitstampEventPayload.ts';
import Trade from '../entity/Trade.ts';


class BitstampPayloadToTradeAdapter implements PayloadToTradeAdapter {

    payloadToTrade(payload: Record<string, unknown>): Trade | undefined {
        const eventPayload = new BitstampEventPayload();
        eventPayload.timeStamp = Number(payload.timeStamp); // TODO: bring microtimestamp and change it to millis. this one is in seconds
        eventPayload.type = payload.type as string;
        
        const payloadData = JSON.parse(payload.data as string);
        eventPayload.eventData.event = payloadData.event;
        eventPayload.eventData.channel = payloadData.channel;
        eventPayload.eventData.tradeData = {
            ...payloadData.data
        };
        
        if (payloadData.event !== 'trade' || !this.validateRequiredFields(eventPayload)) {
            return undefined;
        }

        const trade = eventPayload.eventData.tradeData;

        const tradeTime = Number(trade.microtimestamp) / 1000;

        return {
            exchangeId: 'bitstamp',
            receiveTime: eventPayload.timeStamp.toString(),
            tradeTime: tradeTime.toString(),
            tradeId: trade.id.toString(),
            symbol: eventPayload.eventData.channel.split('_')[2],
            price: trade.price,
            qty: trade.amount
        };
    }
    
    validateRequiredFields(eventPayload: BitstampEventPayload): boolean {
        if (eventPayload.timeStamp
            && eventPayload.type
            && eventPayload.eventData
            && eventPayload.eventData.event
            && eventPayload.eventData.channel
            && eventPayload.eventData.tradeData
            && eventPayload.eventData.tradeData.microtimestamp
            && eventPayload.eventData.tradeData.id
            && eventPayload.eventData.tradeData.price
            && eventPayload.eventData.tradeData.amount)
        {
            return true;
        }

        return false;
    }
}

export default BitstampPayloadToTradeAdapter;
