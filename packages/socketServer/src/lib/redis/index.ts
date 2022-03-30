import { createClient } from 'redis';

function reconnectStrategy(retries: number) {
	return 3000 + 2000 * retries;
}

export const priceRedisClient = createClient({ socket: { reconnectStrategy }, database: 1 });
export const userRedisClient = createClient({ socket: { reconnectStrategy }, database: 2 });
