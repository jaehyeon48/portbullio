import { RealtimeData } from '@portbullio/shared/src/types';
import { majorIndicesRedisClient } from '@lib/index';

export default async function saveMajorIndicesDataIntoDB(data: RealtimeData[]) {
	try {
		await Promise.all(
			data.map(({ ticker, price, change, changePercent }) =>
				majorIndicesRedisClient.set(ticker, JSON.stringify({ price, change, changePercent }))
			)
		);
		return true;
	} catch (error) {
		return false;
	}
}
