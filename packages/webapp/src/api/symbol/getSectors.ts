import axios from 'axios';
import envConfig from '@configs/env';
import { SectorInfo } from '@types';

interface GetSectorsRes {
	data: SectorInfo[];
}

export default async function getSectors(tickers: string[]) {
	const { serverEndPoint } = envConfig;

	if (tickers.length === 0) return [];
	try {
		const { data }: GetSectorsRes = await axios.get(
			`${serverEndPoint}/symbol/sectors?query=${encodeURIComponent(JSON.stringify(tickers))}`,
			{ withCredentials: true }
		);
		return data;
	} catch (error) {
		return [];
	}
}
