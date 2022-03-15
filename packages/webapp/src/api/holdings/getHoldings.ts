import axios from 'axios';
import envConfig from '@configs/env';
import { Holding } from '@portbullio/shared/src/types';
import { StockTransactionLog } from '@prisma/client';

interface GetAllHoldingsRes {
	data: {
		holdings: Holding[];
	};
}

interface GetStockTransactionLogsRes {
	data: {
		transactions: StockTransactionLog[];
	};
}

export async function getAllHoldings(portfolioId: number | undefined): Promise<Holding[]> {
	if (!portfolioId) return [];
	const { serverEndPoint } = envConfig;

	const { data }: GetAllHoldingsRes = await axios.get(
		`${serverEndPoint}/portfolios/${portfolioId}/holdings`,
		{
			withCredentials: true
		}
	);
	return data.holdings;
}

export async function getStockTransactionLogs(portfolioId: number | undefined, ticker: string) {
	if (!portfolioId) return [];
	const { serverEndPoint } = envConfig;

	const { data }: GetStockTransactionLogsRes = await axios.get(
		`${serverEndPoint}/portfolios/${portfolioId}/holdings/${ticker}`,
		{
			withCredentials: true
		}
	);
	return data.transactions;
}
