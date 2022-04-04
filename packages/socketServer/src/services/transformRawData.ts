import { AxiosResponse } from 'axios';
import { RealtimeDataPerTicker, StockDataFromIEX } from '@types';

export default function transformRawData(
	rawData: AxiosResponse<RealtimeDataPerTicker<StockDataFromIEX>, any>[]
) {
	return rawData.flatMap(({ data }) =>
		Object.keys(data).map(ticker => ({
			ticker: data[ticker].quote.symbol,
			change: data[ticker].quote.change.toFixed(3),
			changePercent: (data[ticker].quote.changePercent * 100).toFixed(3),
			price: data[ticker].quote.latestPrice?.toFixed(3)
		}))
	);
}
