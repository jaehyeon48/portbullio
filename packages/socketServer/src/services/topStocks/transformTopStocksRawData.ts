import { RealtimeData, TopStocks } from '@portbullio/shared/src/types';
import { topStocksCategories } from '@constants';

export default function transformTopStocksRawData(rawData: RealtimeData[][]): TopStocks {
	const result = new Map();
	topStocksCategories.forEach((category, idx) => result.set(category, rawData[idx]));
	return Object.fromEntries(result);
}
