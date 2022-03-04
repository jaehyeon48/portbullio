import prisma from '@lib/prisma';
import { StockTransactionType } from '@portbullio/shared/src/types';

interface AddStockTransactionArgs {
	portfolioId: number;
	ticker: string;
	price: number;
	quantity: number;
	memo?: string;
	type: StockTransactionType;
	isRealized: boolean;
}

export default async function addStockTransaction({
	portfolioId,
	ticker,
	price,
	quantity,
	memo = '',
	type,
	isRealized
}: AddStockTransactionArgs) {
	const newLog = await prisma.stockTransactionLog.create({
		data: {
			portfolioId,
			ticker,
			price,
			quantity,
			memo,
			transactionType: type,
			isRealized
		}
	});
	return newLog.id;
}
