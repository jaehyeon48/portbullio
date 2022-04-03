import { realtimeRedisClient } from '@lib/index';
import { ClientStockRealtimeData } from '@portbullio/shared/src/types';

export default async function getRealtimeDataFromDB(
	tickers: string[]
): Promise<ClientStockRealtimeData[]> {
	try {
		const realtimeDataPerTicker = await Promise.all(
			tickers.map(ticker => realtimeRedisClient.get(ticker))
		);

		return realtimeDataPerTicker.map((data, idx) => ({
			ticker: tickers[idx],
			...JSON.parse(data ?? '')
		}));
	} catch (error) {
		return [];
	}
}
