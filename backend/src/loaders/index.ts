import { LoaderProps } from '@src/types';
import logger from '@lib/winston';
import expressLoader from './express';

export default async function appLoader({ app }: LoaderProps) {
	await expressLoader({ app });
	logger.info('Express loaded');
}
