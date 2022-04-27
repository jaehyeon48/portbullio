import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData,
	RealtimeData
} from '@portbullio/shared/src/types';
import getCachedStockOverviewData from './getCachedStockOverviewData';
import fetchStockOverviewData from './fetchStockOverviewData';
import saveRealtimeDataIntoDB from '../saveRealtimeDataIntoDB';

export default async function emitStockOverviewData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
	userId: string,
	ticker: string
) {
	const cachedData = await getCachedStockOverviewData(ticker);
	if (!cachedData) {
		const newData = await fetchStockOverviewData(ticker);
		if (!newData) return;
		await saveRealtimeDataIntoDB([{ ticker, ...newData }]);
		io.to(userId).emit('STOCK_OVERVIEW_DATA', newData);
		return;
	}

	io.to(userId).emit('STOCK_OVERVIEW_DATA', JSON.parse(cachedData) as RealtimeData);
}
