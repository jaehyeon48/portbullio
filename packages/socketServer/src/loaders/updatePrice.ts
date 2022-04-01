import { eventEmitter } from '@lib/index';
import * as Services from '@services/index';
import { RealtimeInfo } from '@types';

const MAX_NUM_OF_REQ_TICKERS = 100;
const REQUEST_PRICE_INTERVAL = 5000;

interface RealtimeData {
	[key: string]: {
		quote: RealtimeInfo;
	};
}

export default async function updatePrice() {
	const tickers = Services.groupTickersBy(
		MAX_NUM_OF_REQ_TICKERS,
		await Services.getAllUsersTickersFromDB()
	);
	const realtimeRawData = await Services.fetchRealtimeData(tickers);

	const realtimeData = realtimeRawData.flatMap(({ data }: { data: RealtimeData }) =>
		Object.keys(data).map(ticker => ({
			ticker: data[ticker].quote.symbol,
			change: data[ticker].quote.change.toFixed(3),
			price: (data[ticker].quote.iexRealtimePrice ?? data[ticker].quote.latestPrice)?.toFixed(3)
		}))
	);

	await Promise.all(
		realtimeData.map(({ ticker, price, change }) =>
			Services.saveRealtimePriceDataIntoDB(ticker, price, change)
		)
	);
	eventEmitter.emit('EMIT_REALTIME_DATA');
	setTimeout(updatePrice, REQUEST_PRICE_INTERVAL);
}
