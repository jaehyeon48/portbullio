import axios from 'axios';
import envConfig from '@configs/env';
import { StockTransactionLog } from '@prisma/client';
import { Holding } from '@portbullio/shared/src/types';

export interface DeleteStockTransactionArgs {
	portfolioId: number;
	stockTransactionId: number;
	ticker: string;
}

interface DeleteStockTransactionRes {
	data: {
		deletedStockTransaction: StockTransactionLog;
		holdingsOfTicker: Holding[];
	};
}

export async function deleteStockTransaction({
	portfolioId,
	stockTransactionId,
	ticker
}: DeleteStockTransactionArgs) {
	const { serverEndPoint } = envConfig;

	const { data }: DeleteStockTransactionRes = await axios.delete(
		`${serverEndPoint}/portfolios/${portfolioId}/holdings/${stockTransactionId}?ticker=${ticker}`,
		{ withCredentials: true }
	);
	return { ...data };
}
