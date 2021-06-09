import PayloadToTradeAdapter from './PayloadToTradeAdapter.ts';

import BinanceEventPayload from '../dto/BinanceEventPayload.ts';
import Trade from '../entity/Trade.ts';


class BinancePayloadToTradeAdapter implements PayloadToTradeAdapter {

    payloadToTrade(payload: Record<string, unknown>): Trade | undefined {
        const eventPayload = new BinanceEventPayload();
        eventPayload.type = payload.type as string;
        
        const payloadData = JSON.parse(payload.data as string);
        eventPayload.eventData = {
            ...payloadData
        };
        
        if (payloadData.e !== 'trade' || !this.validateRequiredFields(eventPayload)) {
            return undefined;
        }

        const trade = eventPayload.eventData;

        return {
            exchangeId: 'binance',
            receiveTime: trade.E.toString(),
            tradeTime: trade.T.toString(),
            tradeId: trade.t.toString(),
            symbol: trade.s.toLowerCase(),
            price: Number(trade.p),
            qty: Number(trade.q)
        };
    }
    
    validateRequiredFields(eventPayload: BinanceEventPayload): boolean {
        if (eventPayload.type
            && eventPayload.eventData
            && eventPayload.eventData.E
            && eventPayload.eventData.T
            && eventPayload.eventData.t
            && eventPayload.eventData.s
            && eventPayload.eventData.p
            && eventPayload.eventData.q)
        {
            return true;
        }

        return false;
    }
}

export default BinancePayloadToTradeAdapter;
