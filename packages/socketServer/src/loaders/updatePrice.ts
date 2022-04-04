import { eventEmitter } from '@lib/index';
import * as Services from '@services/index';
import { MAX_NUM_OF_REQ_TICKERS } from '@constants';

const REQUEST_PRICE_INTERVAL = 5000;

interface RealtimeDataFromIEX {
	symbol: string;
	change: number;
	changePercent: number;
	iexRealtimePrice: number | null;
	latestPrice: number;
}

export default async function updatePrice() {
	const tickers = Services.groupTickersBy(
		MAX_NUM_OF_REQ_TICKERS,
		await Services.getAllUsersTickersFromDB()
	);

	const realtimeRawData = await Services.fetchRealtimeData<RealtimeDataFromIEX>(tickers);
	const realtimeData = realtimeRawData.flatMap(({ data }) =>
		Object.keys(data).map(ticker => ({
			ticker: data[ticker].quote.symbol,
			change: data[ticker].quote.change.toFixed(3),
			changePercent: data[ticker].quote.changePercent.toFixed(3),
			price: (data[ticker].quote.iexRealtimePrice ?? data[ticker].quote.latestPrice)?.toFixed(3)
		}))
	);

	await Promise.all(
		realtimeData.map(({ ticker, price, change, changePercent }) =>
			Services.saveRealtimePriceDataIntoDB(ticker, price, change, changePercent)
		)
	);
	eventEmitter.emit('EMIT_REALTIME_DATA');
	setTimeout(updatePrice, REQUEST_PRICE_INTERVAL);
}
