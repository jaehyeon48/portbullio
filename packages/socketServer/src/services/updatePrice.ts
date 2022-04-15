import { IsMarketOpen, TopStocks } from '@portbullio/shared/src/types';
import { eventEmitter } from '@lib/index';
import * as Services from '@services/index';
import { MAX_NUM_OF_REQ_TICKERS } from '@constants';

const REQUEST_PRICE_INTERVAL = 5000;

export default async function updatePrice(marketStatus: { isMarketOpen: IsMarketOpen }) {
	if (!marketStatus.isMarketOpen) return;
	const majorIndicesData = await Services.fetchMajorIndicesData();
	const allTopStocksData = await Services.fetchTopStocks('all');

	const tickers = Services.groupTickersBy(
		MAX_NUM_OF_REQ_TICKERS,
		await Services.getAllUsersTickersFromDB()
	);
	const realtimeRawData = await Services.fetchRealtimeData(tickers);
	const realtimeData = Services.transformRawStockData(realtimeRawData);

	await Services.saveMajorIndicesDataIntoDB(majorIndicesData);
	await Services.saveRealtimeDataIntoDB(realtimeData);
	if (allTopStocksData) await Services.saveTopStocksDataIntoDB(allTopStocksData as TopStocks);

	eventEmitter.emit('BROADCAST_REALTIME_DATA');
	eventEmitter.emit('BROADCAST_MAJOR_INDICES_DATA', majorIndicesData);
	if (allTopStocksData) eventEmitter.emit('BROADCAST_TOP_STOCKS_DATA');
	setTimeout(updatePrice, REQUEST_PRICE_INTERVAL, marketStatus);
}
