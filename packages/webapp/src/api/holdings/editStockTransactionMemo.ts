import axios, { AxiosRequestConfig } from 'axios';
import { StockTransactionLog } from '@prisma/client';
import envConfig from '@configs/env';

interface EditStockTransactionMemoRes {
	data: {
		result: StockTransactionLog;
	};
}

export default async function editStockTransactionMemo(
	stockTransactionId: number,
	newMemo: string
) {
	const { serverEndPoint } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ memo: newMemo });
	const { data }: EditStockTransactionMemoRes = await axios.patch(
		`${serverEndPoint}/portfolios/holdings/${stockTransactionId}/memo`,
		formData,
		config
	);
	return data.result;
}
