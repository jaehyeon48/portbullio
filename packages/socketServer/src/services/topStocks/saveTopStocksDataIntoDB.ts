import { TopStocks } from '@portbullio/shared/src/types';
import { topStocksRedisClient } from '@lib/index';

export default async function saveTopStocksDataIntoDB(data: TopStocks) {
	try {
		await topStocksRedisClient.set('topStocks', JSON.stringify(data));
		return true;
	} catch (error) {
		return false;
	}
}
