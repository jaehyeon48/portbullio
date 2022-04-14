import { createClient } from 'redis';

function reconnectStrategy(retries: number) {
	return 3000 + 2000 * retries;
}

export const marketStatusRedisClient = createClient({ socket: { reconnectStrategy }, database: 1 });

export const realtimeStockDataSubscribersRedisClient = createClient({
	socket: { reconnectStrategy },
	database: 2
});

export const majorIndicesDataSubscribersRedisClient = createClient({
	socket: { reconnectStrategy },
	database: 3
});

export const topStocksDataSubscribersRedisClient = createClient({
	socket: { reconnectStrategy },
	database: 4
});

export const realtimeStockDataRedisClient = createClient({
	socket: { reconnectStrategy },
	database: 5
});

export const majorIndicesDataRedisClient = createClient({
	socket: { reconnectStrategy },
	database: 6
});

export const topStocksDataRedisClient = createClient({
	socket: { reconnectStrategy },
	database: 7
});
