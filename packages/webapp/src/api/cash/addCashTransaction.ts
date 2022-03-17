import axios, { AxiosRequestConfig } from 'axios';
import { CashTransactionLog, CashTransactionType } from '@prisma/client';
import envConfig from '@configs/env';

export interface AddCashTransactionArgs {
	portfolioId: number;
	amount: number;
	type: CashTransactionType;
	date: string;
}

interface AddCashTransactionRes {
	data: {
		newCashTransaction: CashTransactionLog;
	};
}

export async function addCashTransaction({
	portfolioId,
	amount,
	type,
	date
}: AddCashTransactionArgs) {
	const { serverEndPoint } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({
		amount,
		type,
		date
	});

	const { data }: AddCashTransactionRes = await axios.post(
		`${serverEndPoint}/portfolios/${portfolioId}/cash`,
		formData,
		config
	);

	return { ...data };
}