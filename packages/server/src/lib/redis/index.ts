import { createClient } from 'redis';

function reconnectStrategy(retries: number) {
	return 3000 + 2000 * retries;
}

export const sessionRedisClient = createClient({ socket: { reconnectStrategy } });
export const marketStatusRedisClient = createClient({ socket: { reconnectStrategy }, database: 3 });
