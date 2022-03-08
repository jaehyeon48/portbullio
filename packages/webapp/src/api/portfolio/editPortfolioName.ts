import axios, { AxiosRequestConfig } from 'axios';
import { Portfolio } from '@prisma/client';
import envConfig from '@configs/env';

interface EditPortfolioNameRes {
	data: {
		modifiedPortfolio: Portfolio;
	};
}

export default async function editPortfolioName(portfolioId: number, newPortfolioName: string) {
	const { serverEndPoint } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ newPortfolioName });
	const { data }: EditPortfolioNameRes = await axios.patch(
		`${serverEndPoint}/portfolios/${portfolioId}/name`,
		formData,
		config
	);
	return data.modifiedPortfolio;
}
