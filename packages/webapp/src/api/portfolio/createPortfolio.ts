import axios, { AxiosRequestConfig } from 'axios';
import { PortfolioPrivacy } from '@prisma/client';
import envConfig from '@configs/env';

export default async function createPortfolio(portfolioName: string, privacy: PortfolioPrivacy) {
	const { serverEndPoint } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({
		portfolioName,
		privacy
	});

	await axios.post(`${serverEndPoint}/portfolios`, formData, config);
	return true;
}
