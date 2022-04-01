import { userRedisClient, logger } from '@lib/index';

export default async function registerTickersIntoDB(userId: string, tickers: string[]) {
	try {
		await userRedisClient.set(userId, JSON.stringify(tickers));
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
}