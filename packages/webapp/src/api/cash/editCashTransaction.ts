import axios, { AxiosRequestConfig } from 'axios';
import { CashTransactionLog, CashTransactionType } from '@prisma/client';
import envConfig from '@configs/env';

export interface EditCashTransactionArgs {
	portfolioId: number;
	cashTransactionId: number;
	amount: number;
	type: CashTransactionType;
	date: string;
}

interface EditStockTransactionRes {
	data: {
		editedCashTransaction: CashTransactionLog;
	};
}

export async function editCashTransaction({
	portfolioId,
	cashTransactionId,
	amount,
	type,
	date
}: EditCashTransactionArgs) {
	const { serverEndPoint } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ amount, type, date });
	const { data }: EditStockTransactionRes = await axios.patch(
		`${serverEndPoint}/portfolios/${portfolioId}/cash/${cashTransactionId}`,
		formData,
		config
	);
	return { ...data };
}