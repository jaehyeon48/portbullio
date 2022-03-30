import { randomUUID } from 'crypto';
import redisClient from '@lib/redis';
import envConfig from '@config';

export default async function createSession(userId: number) {
	const sessionTTL = envConfig.sessionIdTTLInSec;
	const newSessionId = randomUUID();
	await redisClient.set(newSessionId, userId, { EX: sessionTTL });
	return newSessionId;
}
