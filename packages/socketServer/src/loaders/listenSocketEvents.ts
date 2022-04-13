import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import * as Services from '@services/index';

export default function listenSocketEvents(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	io.on('connect', socket => {
		socket.on('SUBSCRIBE_TICKER', tickers => Services.subscribeTickersIntoDB(socket.id, tickers));
		socket.on('UNSUBSCRIBE_TICKER', () => Services.unsubscribeTickersFromDB(socket.id));
		socket.on('REQ_CACHED_DATA', tickers => Services.emitCachedData(io, socket.id, tickers));
		socket.on('REQ_MAJOR_INDICES_DATA', () => Services.emitMajorIndicesData(io, socket.id));
		socket.on('REQ_TOP_STOCKS_DATA', () => Services.emitTopStocksData(io, socket.id));
		socket.on('disconnect', () => Services.unsubscribeTickersFromDB(socket.id));
	});
}
