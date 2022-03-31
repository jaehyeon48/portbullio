import { userRedisClient } from '@lib/redis';
import logger from '@lib/winston';

export default async function registerTickers(userId: string, tickers: string[]) {
	try {
		await userRedisClient.set(userId, JSON.stringify(tickers));
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
}