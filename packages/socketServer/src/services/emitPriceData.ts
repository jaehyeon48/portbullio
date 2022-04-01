import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData,
	RealtimeData
} from '@portbullio/shared/src/types';
import getTickersPerUserFromDB from './getTickersPerUserFromDB';
import getRealtimeDataFromDB from './getRealtimeDataFromDB';

export default async function emitPriceData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	const tickersPerUser = await getTickersPerUserFromDB();
	const realtimeData = await Promise.all<RealtimeData[]>(
		tickersPerUser.map(({ tickers }) => getRealtimeDataFromDB(tickers))
	);

	const realtimeDataPerUser = realtimeData.map((data, idx) => ({
		userId: tickersPerUser[idx].userId,
		data
	}));

	realtimeDataPerUser.forEach(({ userId, data }) => {
		io.to(userId).emit('TICKER_DATA', data);
	});
}
