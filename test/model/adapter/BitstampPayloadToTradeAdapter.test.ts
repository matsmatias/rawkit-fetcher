import { assertEquals, assertObjectMatch } from "https://deno.land/std@0.97.0/testing/asserts.ts";

import BitstampPayloadToTradeAdapter from '../../../app/model/adapter/BitstampPayloadToTradeAdapter.ts';
import BitstampEventPayload from '../../../app/model/dto/BitstampEventPayload.ts';
import Trade from '../../../app/model/entity/Trade.ts';


const adapter = new BitstampPayloadToTradeAdapter();

Deno.test("shouldAdaptPayloadToTradeCorrectly", () => {
    const tradePayload = {
        timeStamp: 1622837082586,
        type: 'message',
        data: '{"channel": "live_trades_ethbtc", "data": {"amount": 0.004788, "amount_str": "0.00478800", "buy_order_id": 1368072630870016, "id": 181229966, "microtimestamp": "1622837081803000", "price": 0.07299615, "price_str": "0.07299615", "sell_order_id": 1368072628174849, "timestamp": "1622837081", "type": 0}, "event": "trade"}'
    };

    const expected = {
        exchangeId: 'bitstamp',
        receiveTime: '1622837082586',
        tradeTime: '1622837081803',
        tradeId: '181229966',
        symbol: 'ethbtc',
        price: 0.07299615,
        qty: 0.004788
    };

    assertObjectMatch(adapter.payloadToTrade(tradePayload) as Trade, expected);


    const subscriptionSucceededPayload = {
        timeStamp: 1622837025995,
        type: 'message',
        data: '{"event":"bts:subscription_succeeded","channel":"live_trades_linkbtc","data":{}}'
    };

    assertEquals(adapter.payloadToTrade(subscriptionSucceededPayload), undefined);
});

Deno.test("shouldValidateRequiredFieldsCorrectly", () => {
    const validTradeEventPayload = {
        timeStamp: 1622837082586,
        type: 'message',
        eventData: {
            channel: 'live_trades_ethbtc',
            event: 'trade',
            tradeData: {
                amount: 0.004788,
                id: '181229966',
                price: 0.07299615,
                microtimestamp: '1622837081000000',
                type: 0
            }
        }
    } as BitstampEventPayload;

    assertEquals(adapter.validateRequiredFields(validTradeEventPayload), true);


    const invalidTradeEventPayload = {
        timeStamp: 1622837082586,
        type: 'message',
        eventData: {
            channel: 'live_trades_ethbtc',
            event: 'trade',
            tradeData: {
                id: '181229966',
                price: 0.07299615,
                microtimestamp: '1622837081000000'
            }
        }
    } as BitstampEventPayload;

    assertEquals(adapter.validateRequiredFields(invalidTradeEventPayload), false);

    
    const subscriptionSucceededEventPayload = {
        timeStamp: 1622835768980,
        type: 'message',
        eventData: {
            event: 'bts:subscription_succeeded',
            channel: 'live_trades_ltcbtc',
            data: {}
        }
    } as unknown as BitstampEventPayload;

    assertEquals(adapter.validateRequiredFields(subscriptionSucceededEventPayload), false);
});
