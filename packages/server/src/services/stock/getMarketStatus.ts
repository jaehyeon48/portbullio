import { MarketStatus } from '@portbullio/shared/src/types';
import { marketStatusRedisClient } from '@lib/index';

export default async function getMarketStatus(): Promise<MarketStatus> {
	const result = await marketStatusRedisClient.get('marketState');
	return result as MarketStatus;
}
