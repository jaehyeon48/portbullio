import { LoaderProps } from '@types';
import expressLoader from './express';
import logger from './winston';

export default async function appLoader({ app }: LoaderProps) {
	await expressLoader({ app });
	logger.info('Express loaded');
}

export { default as prisma } from './prisma';
export { logger };
