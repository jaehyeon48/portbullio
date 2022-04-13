import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import * as TopStockService from '@services/topStocks';

export default async function emitTopStocksData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
	userId?: string
) {
	let cachedTopStocksData = await TopStockService.getTopStocksDataFromDB();
	if (!cachedTopStocksData) {
		const topStocksData = await TopStockService.fetchTopStocks();
		cachedTopStocksData = topStocksData;
	}

	if (userId) io.to(userId).emit('TOP_STOCKS_DATA', cachedTopStocksData);
	else io.emit('TOP_STOCKS_DATA', cachedTopStocksData);
}
