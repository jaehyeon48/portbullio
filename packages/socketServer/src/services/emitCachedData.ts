import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import { realtimeStockDataRedisClient } from '@lib/index';
import * as Services from '@services/index';
import { MAX_NUM_OF_REQ_TICKERS } from '@constants';

export default async function emitCachedData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
	userId: string,
	userTickers: string[]
) {
	const cachedTickers = new Set(await realtimeStockDataRedisClient.keys('*'));
	const notCachedTickers = userTickers.filter(ticker => !cachedTickers.has(ticker));

	if (notCachedTickers.length > 0) {
		const tickers = Services.groupTickersBy(MAX_NUM_OF_REQ_TICKERS, notCachedTickers);
		const cachedRawData = await Services.fetchRealtimeData(tickers);
		const cachedData = Services.transformRawData(cachedRawData);
		await Services.saveRealtimeDataIntoDB(cachedData);
	}

	const result = await Services.getRealtimeDataFromDB(userTickers);
	io.to(userId).emit('CACHED_DATA', Services.formatEmitData(result));
}
