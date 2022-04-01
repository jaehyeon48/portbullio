import { userRedisClient } from '@lib/index';

export default async function getTickersPerUserFromDB() {
	try {
		const userIds = await userRedisClient.keys('*');
		const tickersByUser = await Promise.all(userIds.map(userId => userRedisClient.get(userId)));
		return tickersByUser.map((tckers, idx) => ({
			userId: userIds[idx],
			tickers: JSON.parse(tckers ?? '')
		}));
	} catch (error) {
		return [];
	}
}
