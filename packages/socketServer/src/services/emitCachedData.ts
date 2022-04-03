import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import { priceRedisClient } from '@lib/index';
import * as Services from '@services/index';
import { MAX_NUM_OF_REQ_TICKERS } from '@constants';
import { RealtimeDataFilterOptions } from '@types';
import getRealtimeDataFromDB from './getRealtimeDataFromDB';

interface StockDataFromIEX {
	symbol: string;
	change: number;
	latestPrice: number;
}

const fetchDataOptions: (keyof RealtimeDataFilterOptions)[] = ['symbol', 'change', 'latestPrice'];

export default async function emitCachedData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
	userId: string,
	userTickers: string[]
) {
	const cachedTickers = new Set(await priceRedisClient.keys('*'));
	const notCachedTickers = userTickers.filter(ticker => !cachedTickers.has(ticker));

	if (notCachedTickers.length > 0) {
		const tickers = Services.groupTickersBy(MAX_NUM_OF_REQ_TICKERS, notCachedTickers);
		const cachedRawData = await Services.fetchRealtimeData<StockDataFromIEX>(
			tickers,
			fetchDataOptions
		);

		const cachedData = cachedRawData.flatMap(({ data }) =>
			Object.keys(data).map(ticker => ({
				ticker: data[ticker].quote.symbol,
				change: data[ticker].quote.change.toFixed(3),
				price: data[ticker].quote.latestPrice?.toFixed(3)
			}))
		);

		await Promise.all(
			cachedData.map(({ ticker, price, change }) =>
				Services.saveRealtimePriceDataIntoDB(ticker, price, change)
			)
		);
	}

	const result = await getRealtimeDataFromDB(userTickers);
	io.to(userId).emit('CACHED_DATA', result);
}
