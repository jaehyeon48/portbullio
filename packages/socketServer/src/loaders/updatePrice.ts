import { eventEmitter } from '@lib/index';
import * as Services from '@services/index';
import { MAX_NUM_OF_REQ_TICKERS } from '@constants';

const REQUEST_PRICE_INTERVAL = 5000;

export default async function updatePrice() {
	const tickers = Services.groupTickersBy(
		MAX_NUM_OF_REQ_TICKERS,
		await Services.getAllUsersTickersFromDB()
	);

	const realtimeRawData = await Services.fetchRealtimeData(tickers);
	const realtimeData = Services.transformRawData(realtimeRawData);

	await Promise.all(
		realtimeData.map(({ ticker, price, change, changePercent }) =>
			Services.saveRealtimePriceDataIntoDB(ticker, price, change, changePercent)
		)
	);
	eventEmitter.emit('EMIT_REALTIME_DATA');
	setTimeout(updatePrice, REQUEST_PRICE_INTERVAL);
}
