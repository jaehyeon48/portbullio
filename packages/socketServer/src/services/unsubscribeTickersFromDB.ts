import { userRedisClient, logger } from '@lib/index';

export default async function unsubscribeTickersFromDB(userId: string) {
	try {
		await userRedisClient.del(userId);
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
}
