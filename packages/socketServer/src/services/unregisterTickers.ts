import { userRedisClient } from '@lib/redis';
import logger from '@lib/winston';

export default async function unregisterTickers(userId: string) {
	try {
		await userRedisClient.del(userId);
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
}
