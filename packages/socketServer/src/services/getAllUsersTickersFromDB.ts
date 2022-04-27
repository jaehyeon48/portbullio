import {
	realtimeStockDataSubscribersRedisClient,
	stockOverviewPageDataSubscribersRedisClient,
	logger
} from '@lib/index';

export default async function getAllUsersTickersFromDB(): Promise<string[]> {
	try {
		const realtimeStockSubscribers = await realtimeStockDataSubscribersRedisClient.keys('*');
		const stockOverviewPageSubscribers = await stockOverviewPageDataSubscribersRedisClient.keys(
			'*'
		);
		const allTickersOfRealtimeStockSubscribers = await Promise.all(
			realtimeStockSubscribers.map(subscriber =>
				realtimeStockDataSubscribersRedisClient.get(subscriber)
			)
		);

		const allTickersOfStockOverviewPageSubscribers = await Promise.all(
			stockOverviewPageSubscribers.map(subscriber =>
				stockOverviewPageDataSubscribersRedisClient.get(subscriber)
			)
		);
		return [
			...new Set([
				...allTickersOfRealtimeStockSubscribers.flatMap(tickers => JSON.parse(tickers ?? '')),
				...allTickersOfStockOverviewPageSubscribers
			])
		];
	} catch (error) {
		logger.error(`getAllUsersTickersFromDB.ts: ${error}`);
		return [];
	}
}
