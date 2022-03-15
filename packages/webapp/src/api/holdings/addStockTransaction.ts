import axios, { AxiosRequestConfig } from 'axios';
import { StockTransactionLog, StockTransactionType } from '@prisma/client';
import { Holding } from '@portbullio/shared/src/types';
import envConfig from '@configs/env';

export interface AddStockTransactionArgs {
	portfolioId: number;
	ticker: string;
	price: number;
	quantity: number;
	type: StockTransactionType;
	avgBuyCost?: number;
}

interface AddStockTransactionRes {
	data: {
		newStockTransaction: StockTransactionLog;
		holdingsOfTicker: Holding[];
	};
}

export async function addStockTransaction({
	portfolioId,
	ticker,
	price,
	quantity,
	type,
	avgBuyCost
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
		type,
		avgBuyCost
	});

	const { data }: AddStockTransactionRes = await axios.post(
		`${serverEndPoint}/portfolios/${portfolioId}/holdings`,
		formData,
		config
	);

	return {
		newStockTransaction: data.newStockTransaction,
		holdingsOfTicker: data.holdingsOfTicker
	};
}
