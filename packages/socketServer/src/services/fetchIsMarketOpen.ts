import axios, { AxiosError } from 'axios';
import { IsMarketOpen } from '@portbullio/shared/src/types';
import logger from '@lib/winston';
import envConfig from '@config';

interface IsMarketOpenRes {
	data: {
		isUSMarketOpen: boolean;
	};
}

export default async function fetchIsMarketOpen(): Promise<IsMarketOpen> {
	try {
		const { data }: IsMarketOpenRes = await axios.get(
			`https://cloud.iexapis.com/stable/stock/TSLA/quote?filter=isUSMarketOpen&token=${envConfig.iexCloudApiKey}`
		);
		return data.isUSMarketOpen;
	} catch (error) {
		const err = error as AxiosError;
		logger.error(`fetchIsMarketOpen.ts: ${err.message}`);
		return false;
	}
}
