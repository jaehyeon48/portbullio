import { createClient } from 'redis';

function reconnectStrategy(retries: number) {
	return 3000 + 2000 * retries;
}

export const realtimeRedisClient = createClient({ socket: { reconnectStrategy }, database: 1 });
export const userRedisClient = createClient({ socket: { reconnectStrategy }, database: 2 });
export const marketStatusRedisClient = createClient({ socket: { reconnectStrategy }, database: 3 });
export const majorIndicesRedisClient = createClient({ socket: { reconnectStrategy }, database: 4 });
export const top5ListRedisClient = createClient({ socket: { reconnectStrategy }, database: 5 });
