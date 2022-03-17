import axios from 'axios';
import envConfig from '@configs/env';
import { StockTransactionLog } from '@prisma/client';

interface DeleteCashTransactionRes {
	data: {
		deletedCashTransaction: StockTransactionLog;
	};
}

export default async function deleteCashTransaction(cashTransactionId: number) {
	const { serverEndPoint } = envConfig;

	const { data }: DeleteCashTransactionRes = await axios.delete(
		`${serverEndPoint}/portfolios/cash/${cashTransactionId}`,
		{ withCredentials: true }
	);
	return { ...data };
}
