import { realtimeStockDataSubscribersRedisClient, logger } from '@lib/index';

export default async function subscribeTickersIntoDB(userId: string, tickers: string[]) {
	try {
		await realtimeStockDataSubscribersRedisClient.set(userId, JSON.stringify(tickers));
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
}
