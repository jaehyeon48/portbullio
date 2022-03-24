import axios from 'axios';
import envConfig from '@configs/env';
import { StockTransactionLog } from '@prisma/client';

interface GetStockTransactionLogsRes {
	data: {
		transactions: StockTransactionLog[];
	};
}

export default async function getStockTransactionLogs(portfolioId: number, ticker: string) {
	if (portfolioId === -1) return [];
	const { serverEndPoint } = envConfig;

	const { data }: GetStockTransactionLogsRes = await axios.get(
		`${serverEndPoint}/portfolios/${portfolioId}/holdings/${ticker}`,
		{
			withCredentials: true
		}
	);
	return data.transactions;
}
