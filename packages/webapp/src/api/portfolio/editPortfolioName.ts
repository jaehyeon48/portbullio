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

	try {
		await axios.put(`${serverEndPoint}/portfolio/${portfolioId}/name`, formData, config);
		return true;
	} catch (error) {
		return false;
	}
}
