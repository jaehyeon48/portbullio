import { realtimeStockDataSubscribersRedisClient, logger } from '@lib/index';

export default async function getAllUsersTickersFromDB(): Promise<string[]> {
	try {
		const keys = await realtimeStockDataSubscribersRedisClient.keys('*');
		const allTickers = await Promise.all(
			keys.map(key => realtimeStockDataSubscribersRedisClient.get(key))
		);
		return [...new Set(allTickers.flatMap(tickers => JSON.parse(tickers ?? '')))];
	} catch (error) {
		logger.error(error);
		return [];
	}
}
