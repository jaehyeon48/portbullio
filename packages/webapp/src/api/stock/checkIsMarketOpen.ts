import axios, { CancelToken } from 'axios';
import envConfig from '@configs/env';

interface GetMarketStatusRes {
	data: boolean;
}

export default async function checkIsMarketOpen(cancelToken?: CancelToken) {
	const { serverEndPoint } = envConfig;

	try {
		const { data }: GetMarketStatusRes = await axios.get(`${serverEndPoint}/stock/market/status`, {
			cancelToken
		});
		return data;
	} catch (error) {
		return false;
	}
}
