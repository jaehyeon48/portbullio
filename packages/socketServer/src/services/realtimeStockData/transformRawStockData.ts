import { AxiosResponse } from 'axios';
import { RealtimeData } from '@portbullio/shared/src/types';
import { RealtimeDataPerTicker, StockDataFromIEX } from '@types';

export default function transformRawStockData(
	rawData: AxiosResponse<RealtimeDataPerTicker<StockDataFromIEX>, any>[] | null
): RealtimeData[] | null {
	if (!rawData) return null;

	return rawData.flatMap(({ data }) =>
		Object.keys(data).map(ticker => ({
			ticker: data[ticker].quote.symbol,
			change: data[ticker].quote.change,
			changePercent: data[ticker].quote.changePercent * 100,
			price: data[ticker].quote.latestPrice
		}))
	);
}
