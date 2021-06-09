import { assertEquals, assertObjectMatch } from "https://deno.land/std@0.97.0/testing/asserts.ts";

import BinancePayloadToTradeAdapter from '../../../app/model/adapter/BinancePayloadToTradeAdapter.ts';
import BinanceEventPayload from '../../../app/model/dto/BinanceEventPayload.ts';
import Trade from '../../../app/model/entity/Trade.ts';


const adapter = new BinancePayloadToTradeAdapter();

Deno.test("shouldAdaptPayloadToTradeCorrectly", () => {
    const tradePayload = {
        timeStamp: 1622836658803,
        type: 'message',
        data: '{"e":"trade","E":1622836657982,"s":"ETHBTC","t":274548478,"p":"0.07287600","q":"0.31300000","b":1856200681,"a":1856200689,"T":1622836657982,"m":true,"M":true}'
    };

    const expected = {
        exchangeId: 'binance',
        receiveTime: '1622836657982',
        tradeTime: '1622836657982',
        tradeId: '274548478',
        symbol: 'ethbtc',
        price: 0.07287600,
        qty: 0.31300000
    };

    assertObjectMatch(adapter.payloadToTrade(tradePayload) as Trade, expected);


    const subscriptionSucceededPayload = {
        timeStamp: 1622837527714,
        type: 'message',
        data: '{"result":null,"id":1}'
    };

    assertEquals(adapter.payloadToTrade(subscriptionSucceededPayload), undefined);
});

Deno.test("shouldValidateRequiredFieldsCorrectly", () => {
    const validTradeEventPayload = {
        timeStamp: 1622835768980,
        type: 'message',
        eventData: {
            e: 'trade',
            E: 1622835768155,
            s: 'ETHBTC',
            t: 274546843,
            p: '0.07264900',
            q: '0.00700000',
            T: 1622835768153
        }
    } as BinanceEventPayload;

    assertEquals(adapter.validateRequiredFields(validTradeEventPayload), true);


    const invalidTradeEventPayload = {
        timeStamp: 1622835768980,
        type: 'message',
        eventData: {
            e: 'trade',
            E: 1622835768155,
            s: 'ETHBTC',
            t: 274546843,
            T: 1622835768153
        }
    } as BinanceEventPayload;

    assertEquals(adapter.validateRequiredFields(invalidTradeEventPayload), false);

    
    const subscriptionSucceededEventPayload = {
        timeStamp: 1622835768980,
        type: 'message',
        eventData: {
            result: null,
            id: 1
        }
    } as unknown as BinanceEventPayload;

    assertEquals(adapter.validateRequiredFields(subscriptionSucceededEventPayload), false);
});
