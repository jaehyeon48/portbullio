import axios from 'axios';
import envConfig from '@config';
import { RealtimeData, TopStocks, TopStockCategory } from '@portbullio/shared/src/types';
import { topStocksCategories } from '@constants';
import { FMPTopStockData } from '@types';
import transformTopStocksRawData from './transformTopStocksRawData';

interface TopStocksRes {
	data: FMPTopStockData[];
}

export default async function fetchTopStocks(
	category: TopStockCategory
): Promise<TopStocks | RealtimeData[]> {
	if (category === 'all') {
		const topStocksRawData = await Promise.all(topStocksCategories.map(cat => fetchHelper(cat)));
		const topStocksData = transformTopStocksRawData(topStocksRawData);
		return topStocksData;
	}

	const result = await fetchHelper(category);
	return result;
}

async function fetchHelper(category: TopStockCategory): Promise<RealtimeData[]> {
	const { data }: TopStocksRes = await axios.get(
		`https://financialmodelingprep.com/api/v3/stock_market/${category}?apikey=${envConfig.fmpApiKey}`
	);

	return data.map(({ symbol, price, change, changesPercentage }) => ({
		ticker: symbol,
		price,
		change,
		changePercent: changesPercentage
	}));
}
