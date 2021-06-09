import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";

import BitstampRequestBuilder from '../../../app/ws/request/BitstampRequestBuilder.ts';


const builder = new BitstampRequestBuilder();

Deno.test("shouldBuildSubscribeStringCorrectly", () => {
    const channel = 'live_trades_ethbtc';
    const expected = '{"event": "bts:subscribe", "data": {"channel": "live_trades_ethbtc"}}';

    assertEquals(builder.subscribe(channel), expected);
});

Deno.test("shouldBuildUnsubscribeStringCorrectly", () => {
    const channel = 'live_trades_ltcbtc';
    const expected = '{"event": "bts:unsubscribe", "data": {"channel": "live_trades_ltcbtc"}}';

    assertEquals(builder.unsubscribe(channel), expected);
});
