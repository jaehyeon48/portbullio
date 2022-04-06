import axios from 'axios';
import envConfig from '@configs/env';
import { IsMarketOpen } from '@portbullio/shared/src/types';

interface GetMarketStatusRes {
	data: IsMarketOpen;
}

export default async function checkIsMarketOpen() {
	const { serverEndPoint } = envConfig;

	try {
		const { data }: GetMarketStatusRes = await axios.get(`${serverEndPoint}/stock/market/status`);
		return data;
	} catch (error) {
		return false;
	}
}
