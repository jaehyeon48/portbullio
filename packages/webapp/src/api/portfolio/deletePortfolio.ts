import axios from 'axios';
import envConfig from '@configs/env';

export interface DeletePortfolioArgs {
	portfolioId: number;
	isDefaultPortfolio: boolean;
}

interface DeletePortfolioRes {
	data: {
		deletedId: number;
	};
}

export async function deletePortfolio({ portfolioId, isDefaultPortfolio }: DeletePortfolioArgs) {
	const { serverEndPoint } = envConfig;

	const { data }: DeletePortfolioRes = await axios.delete(
		`${serverEndPoint}/portfolios/${portfolioId}?isDefaultPortfolio=${
			isDefaultPortfolio ? '1' : '0'
		}`,
		{ withCredentials: true }
	);
	return data.deletedId;
}
