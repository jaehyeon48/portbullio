import { RealtimeData, TopStocks, TopStockCategory } from '@portbullio/shared/src/types';
import { topStocksCategories } from '@constants';
import { topStocksRedisClient } from '@lib/index';
import transformTopStocksRawData from './transformTopStocksRawData';

export default async function getTopStocksDataFromDB(
	category: TopStockCategory
): Promise<TopStocks | RealtimeData[] | null> {
	try {
		if (category === 'all') {
			const topStocksRawData = await Promise.all(
				topStocksCategories.map(cat => topStocksRedisClient.get(cat))
			);

			if (topStocksRawData.some(data => data === null)) return null;
			const topStocksData = transformTopStocksRawData(
				topStocksRawData.map(data => JSON.parse(data ?? ''))
			);
			return topStocksData;
		}

		const topStocksData = await topStocksRedisClient.get(category);
		if (!topStocksData) return null;
		return JSON.parse(topStocksData);
	} catch (error) {
		return null;
	}
}
