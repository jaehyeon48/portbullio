import axios, { AxiosRequestConfig } from 'axios';
import envConfig from '@configs/env';

export default async function editPortfolioName(portfolioId: number, newPortfolioName: string) {
	const { serverEndPoint } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ newPortfolioName });
	await axios.patch(`${serverEndPoint}/portfolios/${portfolioId}/name`, formData, config);
}
