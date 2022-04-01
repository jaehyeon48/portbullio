import { Server } from 'socket.io';
import { priceRedisClient, userRedisClient, logger } from '@lib/index';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import listenSocketEvents from './listenSocketEvents';
import updatePrice from './updatePrice';

export default async function appLoader(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	await priceRedisClient.connect();
	await userRedisClient.connect();

	priceRedisClient.on('error', err => logger.error('Price Redis Client Error', err));
	userRedisClient.on('error', err => logger.error('User Redis Client Error', err));

	listenSocketEvents(io);
	updatePrice(io);
}
