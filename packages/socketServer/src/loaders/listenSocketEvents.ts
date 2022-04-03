import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import { subscribeTickersIntoDB, unregisterTickersFromDB, emitCachedData } from '@services/index';

export default function listenSocketEvents(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	io.on('connect', socket => {
		socket.on('SUBSCRIBE_TICKER', tickers => subscribeTickersIntoDB(socket.id, tickers));
		socket.on('UNSUBSCRIBE_TICKER', () => unregisterTickersFromDB(socket.id));
		socket.on('REQ_CACHED_DATA', tickers => emitCachedData(io, socket.id, tickers));
		socket.on('disconnect', () => unregisterTickersFromDB(socket.id));
	});
}
