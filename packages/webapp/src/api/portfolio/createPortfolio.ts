import axios, { AxiosRequestConfig } from 'axios';
import { PortfolioPrivacy } from '@portbullio/shared/src/types';
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

	try {
		await axios.post(`${serverEndPoint}/portfolio/`, formData, config);
		return true;
	} catch (error) {
		return false;
	}
}
