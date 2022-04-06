import axios from 'axios';
import { IsMarketOpen } from '@portbullio/shared/src/types';
import envConfig from '@config';

export default async function fetchIsMarketOpen(): Promise<IsMarketOpen> {
	const { data } = await axios.get(
		`https://cloud.iexapis.com/stable/stock/TSLA/quote?filter=isUSMarketOpen&token=${envConfig.iexCloudApiKey}`
	);
	return data === 'true';
}
