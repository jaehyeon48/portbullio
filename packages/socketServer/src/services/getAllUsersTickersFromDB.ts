import { userRedisClient, logger } from '@lib/index';

export default async function getAllUsersTickersFromDB(): Promise<string[]> {
	try {
		const keys = await userRedisClient.keys('*');
		const allTickers = await Promise.all(keys.map(key => userRedisClient.get(key)));
		return [...new Set(allTickers.flatMap(tickers => JSON.parse(tickers ?? '')))];
	} catch (error) {
		logger.error(error);
		return [];
	}
}
