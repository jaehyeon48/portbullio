import axios from 'axios';
import envConfig from '@configs/env';
import { Holding } from '@types';

interface GetAllHoldingsRes {
	data: {
		holdings: Holding[];
	};
}

export async function getAllHoldings(portfolioId: number | undefined): Promise<Holding[]> {
	if (!portfolioId) return [];
	const { serverEndPoint } = envConfig;

	try {
		const { data }: GetAllHoldingsRes = await axios.get(
			`${serverEndPoint}/portfolios/${portfolioId}/holdings`,
			{
				withCredentials: true
			}
		);
		return data.holdings;
	} catch (error) {
		return [];
	}
}
