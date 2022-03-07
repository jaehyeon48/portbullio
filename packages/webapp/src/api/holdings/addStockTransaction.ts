import axios, { AxiosRequestConfig } from 'axios';
import { StockTransactionType } from '@portbullio/shared/src/types';
import envConfig from '@configs/env';

interface AddStockTransactionArgs {
	portfolioId: number;
	ticker: string;
	price: number;
	quantity: number;
	type: StockTransactionType;
}

export default async function addStockTransaction({
	portfolioId,
	ticker,
	price,
	quantity,
	type
}: AddStockTransactionArgs) {
	const { serverEndPoint } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({
		ticker,
		price,
		quantity,
		type
	});

	try {
		await axios.post(`${serverEndPoint}/portfolios/${portfolioId}/holdings`, formData, config);
		return true;
	} catch (error) {
		return false;
	}
}
