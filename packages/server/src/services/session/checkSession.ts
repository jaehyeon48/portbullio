import redisClient from '@lib/redis';

export default async function checkSession(sessionId: string) {
	const userId = await redisClient.get(sessionId);
	return userId;
}
