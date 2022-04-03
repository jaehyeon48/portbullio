import { Server } from 'socket.io';
import * as Lib from '@lib/index';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import { emitRealtimeData } from '@services/index';
import listenSocketEvents from './listenSocketEvents';
import updatePrice from './updatePrice';

export default async function appLoader(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	await Lib.realtimeRedisClient.connect();
	await Lib.userRedisClient.connect();
	await Lib.marketStatusRedisClient.connect();
	await Lib.userRedisClient.flushDb();

	Lib.realtimeRedisClient.on('error', err => Lib.logger.error('Price Redis Client Error', err));
	Lib.userRedisClient.on('error', err => Lib.logger.error('User Redis Client Error', err));
	Lib.marketStatusRedisClient.on('error', err =>
		Lib.logger.error('Market Status Redis Client Error', err)
	);

	listenSocketEvents(io);
	updatePrice();
	Lib.eventEmitter.on('EMIT_REALTIME_DATA', () => {
		emitRealtimeData(io);
	});
}
