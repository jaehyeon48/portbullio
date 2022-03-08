import axios, { AxiosRequestConfig } from 'axios';
import envConfig from '@configs/env';

export default async function editDefaultPortfolio(
	prevPortfolioId: number,
	newPortfolioId: number
) {
	const { serverEndPoint } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ newPortfolioId });
	await axios.put(`${serverEndPoint}/portfolios/${prevPortfolioId}/default`, formData, config);
}
