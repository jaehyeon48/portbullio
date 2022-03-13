import prisma from '@lib/prisma';
import { StockTransactionType } from '@prisma/client';

interface AddStockTransactionArgs {
	portfolioId: number;
	ticker: string;
	price: number;
	quantity: number;
	memo?: string;
	type: StockTransactionType;
	avgBuyCost?: number;
}

export default async function addStockTransaction({
	portfolioId,
	ticker,
	price,
	quantity,
	memo = '',
	type,
	avgBuyCost
}: AddStockTransactionArgs) {
	const newLog = await prisma.stockTransactionLog.create({
		data: {
			portfolioId,
			ticker,
			price,
			quantity,
			memo,
			transactionType: type,
			avgBuyCost
		}
	});
	return newLog;
}
