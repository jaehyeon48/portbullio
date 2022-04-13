import axios from 'axios';
import envConfig from '@config';
import { RealtimeData, TopStocks } from '@portbullio/shared/src/types';
import { topStocksCategories } from '@constants';
import { FMPTopStockData, TopStocksCategory } from '@types';
import transformTopStocksRawData from './transformTopStocksRawData';

interface TopStocksRes {
	data: FMPTopStockData[];
}

export default async function fetchTopStocks(): Promise<TopStocks> {
	const topStocksRawData = await Promise.all(
		topStocksCategories.map(category => fetchHelper(category))
	);

	const topStocksData = transformTopStocksRawData(topStocksRawData);
	return topStocksData;
}

async function fetchHelper(category: TopStocksCategory): Promise<RealtimeData[]> {
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
