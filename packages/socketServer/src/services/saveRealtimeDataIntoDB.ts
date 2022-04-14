import { RealtimeData } from '@portbullio/shared/src/types';
import { realtimeStockDataRedisClient } from '@lib/index';

export default async function saveRealtimeDataIntoDB(data: RealtimeData[]) {
	try {
		await Promise.all(
			data.map(({ ticker, price, change, changePercent }) =>
				realtimeStockDataRedisClient.set(ticker, JSON.stringify({ price, change, changePercent }))
			)
		);
		return true;
	} catch (error) {
		return false;
	}
}
