import { Application } from 'https://deno.land/x/oak@v7.5.0/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import { connect } from 'https://deno.land/x/redis@v0.22.1/mod.ts';

import router from './app/api/router.ts';
import Exchange from './app/model/entity/Exchange.ts';
import ExchangeWebsocketConnector from './app/ws/connection/ExchangeWebsocketConnector.ts';

import { EXCHANGES } from './app/config/exchanges.ts';
import { TICKERS } from './app/config/tickers.ts';
import { APP_PORT, REDIS_HOSTNAME, REDIS_PORT, FRONTEND_URL } from './app/config/app.ts';


// Connect to Redis
const redis = await connect({
  hostname: REDIS_HOSTNAME,
  port: REDIS_PORT
});

// Connect to Exchanges
const connector = new ExchangeWebsocketConnector(redis);

EXCHANGES.forEach(function(exchange: Exchange) {
    connector.connectToExchange(exchange, TICKERS);
});

// Publish API
const app = new Application();

app.use(
  oakCors({
    origin: FRONTEND_URL
  }), 
);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`API running on port ${APP_PORT}`);
await app.listen({ port: APP_PORT });
