import { AxiosResponse } from 'axios';
import { RealtimeData } from '@portbullio/shared/src/types';
import { RealtimeDataPerTicker, StockDataFromIEX } from '@types';

export default function transformRawData(
	rawData: AxiosResponse<RealtimeDataPerTicker<StockDataFromIEX>, any>[]
): RealtimeData[] {
	return rawData.flatMap(({ data }) =>
		Object.keys(data).map(ticker => ({
			ticker: data[ticker].quote.symbol,
			change: data[ticker].quote.change.toFixed(3),
			changePercent: (data[ticker].quote.changePercent * 100).toFixed(3),
			price: data[ticker].quote.latestPrice?.toFixed(3)
		}))
	);
}
