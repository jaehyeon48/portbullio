import { priceRedisClient } from '@lib/index';

export default async function saveRealtimePriceDataIntoDB(
	ticker: string,
	price: string,
	change: string
) {
	try {
		await priceRedisClient.set(ticker, JSON.stringify({ price, change }));
		return true;
	} catch (error) {
		return false;
	}
}
