import { priceRedisClient } from '@lib/index';

export default async function getRealtimeDataFromDB(tickers: string[]) {
	try {
		const realtimeDataPerTicker = await Promise.all(
			tickers.map(ticker => priceRedisClient.get(ticker))
		);
		return realtimeDataPerTicker.map(data => JSON.parse(data ?? ''));
	} catch (error) {
		return [];
	}
}
