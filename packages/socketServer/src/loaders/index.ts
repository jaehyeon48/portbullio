import { Server } from 'socket.io';
import * as Lib from '@lib/index';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData,
	MarketStatus
} from '@portbullio/shared/src/types';
import { emitRealtimeData, updatePrice, getCurrentMarketState } from '@services/index';
import listenSocketEvents from './listenSocketEvents';

const marketStatus: { status: MarketStatus } = { status: 'closed' };

export default async function appLoader(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	await Lib.realtimeRedisClient.connect();
	await Lib.userRedisClient.connect();
	await Lib.marketStatusRedisClient.connect();
	await Lib.userRedisClient.flushDb();
	marketStatus.status = await getCurrentMarketState();

	Lib.realtimeRedisClient.on('error', err => Lib.logger.error('Price Redis Client Error', err));
	Lib.userRedisClient.on('error', err => Lib.logger.error('User Redis Client Error', err));
	Lib.marketStatusRedisClient.on('error', err =>
		Lib.logger.error('Market Status Redis Client Error', err)
	);

	listenSocketEvents(io);
	if (marketStatus.status === 'opened') updatePrice();
	Lib.eventEmitter.on('EMIT_REALTIME_DATA', () => {
		emitRealtimeData(io);
	});
}
