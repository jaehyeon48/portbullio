import { RealtimeData, TopStocks } from '@portbullio/shared/src/types';
import { topStocksCategories } from '@constants';
import { TopStocksCategory } from '@types';

export default function transformRawData(rawData: RealtimeData[][]): TopStocks {
	const result = new Map();
	topStocksCategories.forEach((category, idx) => result.set(category, rawData[idx]));
	return Object.fromEntries(result);
}
