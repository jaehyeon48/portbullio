import axios from 'axios';
import envConfig from '@configs/env';
import { Portfolio } from '@types';

interface GetPortfolioRes {
	data: {
		portfolio: Portfolio;
	};
}

interface GetPortfoliosRes {
	data: {
		portfolios: Portfolio[];
	};
}

export async function getPortfolio(portfolioId: number): Promise<Portfolio | null> {
	const { serverEndPoint } = envConfig;

	try {
		const { data }: GetPortfolioRes = await axios.get(
			`${serverEndPoint}/portfolio/${portfolioId}`,
			{
				withCredentials: true
			}
		);
		return data.portfolio;
	} catch (error) {
		return null;
	}
}

export async function getPortfolios(): Promise<Portfolio[]> {
	const { serverEndPoint } = envConfig;

	try {
		const { data }: GetPortfoliosRes = await axios.get(`${serverEndPoint}/portfolio/all`, {
			withCredentials: true
		});
		return data.portfolios;
	} catch (error) {
		return [];
	}
}
