import axios from 'axios';
import envConfig from '@configs/env';

interface DeletePortfolioRes {
	data: {
		deletedId: number;
	};
}

export default async function deletePortfolio(portfolioId: number, isDefaultPortfolio: boolean) {
	const { serverEndPoint } = envConfig;

	const { data }: DeletePortfolioRes = await axios.delete(
		`${serverEndPoint}/portfolios/${portfolioId}?isDefaultPortfolio=${
			isDefaultPortfolio ? '1' : '0'
		}`,
		{ withCredentials: true }
	);
	return data.deletedId;
}
