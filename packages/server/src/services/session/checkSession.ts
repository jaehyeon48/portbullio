import { sessionRedisClient } from '@lib/redis';

export default async function checkSession(sessionId: string | undefined) {
	if (sessionId === undefined) return null;
	const userId = await sessionRedisClient.get(sessionId);
	return userId;
}
