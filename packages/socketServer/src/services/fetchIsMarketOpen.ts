import axios from 'axios';
import { IsMarketOpen } from '@portbullio/shared/src/types';
import envConfig from '@config';

interface IsMarketOpenRes {
	data: {
		isUSMarketOpen: boolean;
	};
}

export default async function fetchIsMarketOpen(): Promise<IsMarketOpen> {
	const { data }: IsMarketOpenRes = await axios.get(
		`https://cloud.iexapis.com/stable/stock/TSLA/quote?filter=isUSMarketOpen&token=${envConfig.iexCloudApiKey}`
	);
	return data.isUSMarketOpen;
}
