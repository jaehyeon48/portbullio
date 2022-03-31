import { Server } from 'socket.io';
import logger from '@lib/winston';
import { priceRedisClient, userRedisClient } from '@lib/redis';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import listenSocketEvents from './listenSocketEvents';

export default async function appLoader(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	await priceRedisClient.connect();
	await userRedisClient.connect();

	priceRedisClient.on('error', err => logger.error('Price Redis Client Error', err));
	userRedisClient.on('error', err => logger.error('User Redis Client Error', err));

	listenSocketEvents(io);
}
