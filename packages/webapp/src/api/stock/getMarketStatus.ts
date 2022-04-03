import axios from 'axios';
import envConfig from '@configs/env';
import { MarketStatus } from '@portbullio/shared/src/types';

interface GetMarketStatusRes {
	data: MarketStatus;
}

export default async function getMarketStatus() {
	const { serverEndPoint } = envConfig;

	try {
		const { data }: GetMarketStatusRes = await axios.get(`${serverEndPoint}/stock/market/status`);
		return data;
	} catch (error) {
		return 'closed';
	}
}
