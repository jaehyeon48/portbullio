import axios, { AxiosError } from 'axios';
import { RealtimeDataProperties } from '@portbullio/shared/src/types';
import envConfig from '@config';
import { RealtimeDataFilterOptions } from '@types';
import logger from '@lib/winston';

interface StockOverviewFetchRealtimeDataRes {
	data: RealtimeDataProperties;
}

const { iexCloudBaseUrl, iexCloudApiKey } = envConfig;

export default async function fetchStockOverviewData(ticker: string) {
	const requestFilter = filter.join(',');
	try {
		const { data }: StockOverviewFetchRealtimeDataRes = await axios.get(
			`${iexCloudBaseUrl}/stock/${ticker}/quote?filter=${requestFilter}&token=${iexCloudApiKey}`
		);

		return data;
	} catch (error) {
		const err = error as AxiosError;
		logger.error(`stockOverviewData fetchStockOverviewData.ts: ${err.message}`);
		return null;
	}
}

const filter: (keyof RealtimeDataFilterOptions)[] = [
	'change',
	'changePercent',
	'iexRealtimePrice',
	'latestPrice',
	'open',
	'previousClose',
	'high',
	'low',
	'marketCap',
	'latestVolume',
	'week52High',
	'week52Low',
	'peRatio'
];
