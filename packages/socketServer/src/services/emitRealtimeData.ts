import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import getTickersPerUserFromDB from './getTickersPerUserFromDB';
import getRealtimeDataFromDB from './getRealtimeDataFromDB';

export default async function emitRealtimeData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	const tickersPerUser = await getTickersPerUserFromDB();
	const realtimeData = await Promise.all(
		tickersPerUser.map(({ tickers }) => getRealtimeDataFromDB(tickers))
	);

	const realtimeDataPerUser = realtimeData.map((data, idx) => ({
		userId: tickersPerUser[idx].userId,
		data
	}));

	realtimeDataPerUser.forEach(({ userId, data }) => {
		io.to(userId).emit('REALTIME_DATA', data);
	});
}
