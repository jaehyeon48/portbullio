import axios, { AxiosRequestConfig } from 'axios';
import { PortfolioPrivacy } from '@portbullio/shared/src/types';
import envConfig from '@configs/env';

export default async function editPortfolioName(portfolioId: number, newPrivacy: PortfolioPrivacy) {
	const { serverEndPoint } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ newPrivacy });

	try {
		await axios.patch(`${serverEndPoint}/portfolios/${portfolioId}/privacy`, formData, config);
		return true;
	} catch (error) {
		return false;
	}
}
