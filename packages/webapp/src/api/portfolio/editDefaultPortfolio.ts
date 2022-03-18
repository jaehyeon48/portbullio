import axios, { AxiosRequestConfig } from 'axios';
import envConfig from '@configs/env';

export interface EditDefaultPortfolioArgs {
	prevPortfolioId: number;
	newPortfolioId: number;
}

interface EditDefaultPortfolioRes {
	data: {
		modifiedId: number;
	};
}

export async function editDefaultPortfolio({
	newPortfolioId,
	prevPortfolioId
}: EditDefaultPortfolioArgs) {
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
