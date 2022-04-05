import axios from 'axios';
import { MarketStatus } from '@portbullio/shared/src/types';
import envConfig from '@config';

export default async function checkIsMarketOpen(): Promise<MarketStatus> {
	const { data } = await axios.get(
		`https://cloud.iexapis.com/stable/stock/TSLA/quote?filter=isUSMarketOpen&token=${envConfig.iexCloudApiKey}`
	);
	return data ? 'opened' : 'closed';
}
