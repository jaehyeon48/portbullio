import axios from 'axios';
import envConfig from '@configs/env';
import { Holding } from '@portbullio/shared/src/types';

interface GetAllHoldingsRes {
	data: {
		holdings: Holding[];
	};
}

export default async function getAllHoldings(portfolioId: number | undefined): Promise<Holding[]> {
	if (!portfolioId) return [];
	const { serverEndPoint } = envConfig;

	const { data }: GetAllHoldingsRes = await axios.get(
		`${serverEndPoint}/portfolios/${portfolioId}/holdings`,
		{
			withCredentials: true
		}
	);
	return data.holdings;
}
