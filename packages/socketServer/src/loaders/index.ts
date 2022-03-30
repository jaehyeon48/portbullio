import logger from '@lib/winston';
import { priceRedisClient, userRedisClient } from '@lib/redis';

export default async function appLoader() {
	await priceRedisClient.connect();
	await userRedisClient.connect();

	priceRedisClient.on('error', err => logger.error('Price Redis Client Error', err));
	userRedisClient.on('error', err => logger.error('User Redis Client Error', err));
}
