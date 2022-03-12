import prisma from '@lib/prisma';
import { StockTransactionType } from '@portbullio/shared/src/types';

interface AddStockTransactionArgs {
	portfolioId: number;
	ticker: string;
	price: number;
	quantity: number;
	memo?: string;
	type: StockTransactionType;
	priceDiff?: number;
}

export default async function addStockTransaction({
	portfolioId,
	ticker,
	price,
	quantity,
	memo = '',
	type,
	priceDiff
}: AddStockTransactionArgs) {
	const newLog = await prisma.stockTransactionLog.create({
		data: {
			portfolioId,
			ticker,
			price,
			quantity,
			memo,
			transactionType: type,
			priceDiff
		}
	});
	return newLog;
}
