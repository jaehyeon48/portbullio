import redisClient from '@lib/redis';

export default async function deleteSession(sessionId: string) {
	await redisClient.del(sessionId);
	return;
}
