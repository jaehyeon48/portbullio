import { realtimeRedisClient } from '@lib/index';

export default async function saveRealtimePriceDataIntoDB(
	ticker: string,
	price: string,
	change: string
) {
	try {
		await realtimeRedisClient.set(ticker, JSON.stringify({ price, change }));
		return true;
	} catch (error) {
		return false;
	}
}
