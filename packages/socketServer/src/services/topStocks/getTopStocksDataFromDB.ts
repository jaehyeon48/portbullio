import { TopStocks } from '@portbullio/shared/src/types';
import { topStocksRedisClient } from '@lib/index';

export default async function getTopStocksDataFromDB(): Promise<TopStocks | null> {
	try {
		const topStocksData = await topStocksRedisClient.get('topStocks');
		if (!topStocksData) return null;
		return JSON.parse(topStocksData);
	} catch (error) {
		return null;
	}
}
