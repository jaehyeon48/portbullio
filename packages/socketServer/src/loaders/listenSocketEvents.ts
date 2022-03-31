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
		socket.on('REGISTER_TICKER', tickers => Services.registerTickers(socket.id, tickers));
		socket.on('disconnect', () => Services.unregisterTickers(socket.id));
	});
}
