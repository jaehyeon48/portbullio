import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import { registerTickersIntoDB, unregisterTickersFromDB } from '@services/index';

export default function listenSocketEvents(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	io.on('connect', socket => {
		socket.on('SUBSCRIBE_TICKER', tickers => registerTickersIntoDB(socket.id, tickers));
		socket.on('UNSUBSCRIBE_TICKER', () => unregisterTickersFromDB(socket.id));
		socket.on('disconnect', () => unregisterTickersFromDB(socket.id));
	});
}
