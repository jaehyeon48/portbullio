import axios, { AxiosRequestConfig } from 'axios';
import envConfig from '@configs/env';

interface EditDefaultPortfolioRes {
	data: {
		modifiedId: number;
	};
}

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
	const { data }: EditDefaultPortfolioRes = await axios.put(
		`${serverEndPoint}/portfolios/${prevPortfolioId}/default`,
		formData,
		config
	);
	return data.modifiedId;
}
