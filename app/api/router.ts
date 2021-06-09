import { Router } from 'https://deno.land/x/oak@v7.5.0/mod.ts';

import { EXCHANGES } from '../config/exchanges.ts';
import { TICKERS } from '../config/tickers.ts';


const router = new Router();

router.get('/config', ({ response }) => {
    const appConfig = {
        exchanges: EXCHANGES.map(exchange => exchange.id),
        tickers: TICKERS
    };

    response.body = JSON.stringify(appConfig);
});

export default router;
