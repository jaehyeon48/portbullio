import axios, { AxiosResponse } from 'axios';
import envConfig from '@config';
import { RealtimeDataFilterOptions } from '@types';

interface RealtimeDataPerTicker<T> {
	[key: string]: {
		quote: T;
	};
}

const { iexCloudBaseUrl, iexCloudApiKey } = envConfig;
const requestPath = '/stock/market/batch';

export default async function fetchRealtimeData<RealtimeDataKeys>(
	tickers: string[][],
	filter = defaultFilter
) {
	const requestFilter = filter.join(',');
	const result: AxiosResponse<RealtimeDataPerTicker<RealtimeDataKeys>>[] = await Promise.all(
		tickers.map(tickerGroup => {
			const tickerParam = tickerGroup.map(ticker => encodeURIComponent(ticker)).join(',');
			return axios.get(
				`${iexCloudBaseUrl}${requestPath}?symbols=${tickerParam}&types=quote&filter=${requestFilter}&token=${iexCloudApiKey}`
			);
		})
	);

	return result;
}

const defaultFilter: (keyof RealtimeDataFilterOptions)[] = [
	'symbol',
	'change',
	'iexRealtimePrice',
	'latestPrice'
];
