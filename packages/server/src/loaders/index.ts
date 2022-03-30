import { LoaderProps } from '@src/types';
import logger from '@lib/winston';
import redisClient from '@lib/redis';
import expressLoader from './express';

export default async function appLoader({ app }: LoaderProps) {
	await expressLoader({ app });
	logger.info('Express loaded');

	await redisClient.connect();
	redisClient.on('error', err => logger.error('Redis Client Error', err));
}
