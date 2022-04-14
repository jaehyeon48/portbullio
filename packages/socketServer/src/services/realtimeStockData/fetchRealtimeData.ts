import axios, { AxiosResponse } from 'axios';
import envConfig from '@config';
import { RealtimeDataFilterOptions, RealtimeDataPerTicker, StockDataFromIEX } from '@types';

const { iexCloudBaseUrl, iexCloudApiKey } = envConfig;
const requestPath = '/stock/market/batch';

export default async function formatRealtimeDataToEmit(tickers: string[][]) {
	const requestFilter = filter.join(',');
	const result: AxiosResponse<RealtimeDataPerTicker<StockDataFromIEX>>[] = await Promise.all(
		tickers.map(tickerGroup => {
			const tickerParam = tickerGroup.map(ticker => encodeURIComponent(ticker)).join(',');
			return axios.get(
				`${iexCloudBaseUrl}${requestPath}?symbols=${tickerParam}&types=quote&filter=${requestFilter}&token=${iexCloudApiKey}`
			);
		})
	);

	return result;
}

const filter: (keyof RealtimeDataFilterOptions)[] = [
	'symbol',
	'change',
	'changePercent',
	'iexRealtimePrice',
	'latestPrice'
];
