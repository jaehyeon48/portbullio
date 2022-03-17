import axios, { AxiosRequestConfig } from 'axios';
import { CashTransactionLog } from '@prisma/client';
import envConfig from '@configs/env';

interface EditCashTransactionMemoRes {
	data: {
		editedCashTransaction: CashTransactionLog;
	};
}

export default async function editCashTransactionMemo(cashTransactionId: number, newMemo: string) {
	const { serverEndPoint } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ memo: newMemo });
	const { data }: EditCashTransactionMemoRes = await axios.patch(
		`${serverEndPoint}/portfolios/cash/${cashTransactionId}/memo`,
		formData,
		config
	);
	return { ...data };
}
