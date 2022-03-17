import axios from 'axios';
import envConfig from '@configs/env';
import { CashTransactionLog } from '@prisma/client';

interface GetCashTransactionLogsRes {
	data: {
		cashTransactions: CashTransactionLog[];
	};
}

export default async function getCashTransactionLogs(portfolioId: number | undefined) {
	if (!portfolioId) return [];
	const { serverEndPoint } = envConfig;

	const { data }: GetCashTransactionLogsRes = await axios.get(
		`${serverEndPoint}/portfolios/${portfolioId}/cash`,
		{
			withCredentials: true
		}
	);
	return data.cashTransactions;
}