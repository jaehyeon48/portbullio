import { IsMarketOpen } from '@portbullio/shared/src/types';
import { marketStatusRedisClient } from '@lib/index';

export default async function getMarketStatus(): Promise<IsMarketOpen> {
	const result = (await marketStatusRedisClient.get('isMarketOpen')) ?? 'false';
	return result === 'true';
}
