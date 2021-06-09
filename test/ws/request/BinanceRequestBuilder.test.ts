import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";

import BinanceRequestBuilder from '../../../app/ws/request/BinanceRequestBuilder.ts';


const builder = new BinanceRequestBuilder();

Deno.test("shouldBuildSubscribeStringCorrectly", () => {
    const channel = 'ethbtc@trade';
    const expected = '{"method": "SUBSCRIBE", "params": ["ethbtc@trade"], "id": 1}';

    assertEquals(builder.subscribe(channel), expected);
});

Deno.test("shouldBuildUnsubscribeStringCorrectly", () => {
    const channel = 'ltcbtc@trade';
    const expected = '{"method": "UNSUBSCRIBE", "params": ["ltcbtc@trade"], "id": 1}';

    assertEquals(builder.unsubscribe(channel), expected);
});
