import prisma from '@lib/prisma';
import { StockTransactionType } from '@portbullio/shared/src/types';

interface UpdateStockTransactionArgs {
	stockTransactionId: number;
	price: number;
	quantity: number;
	type: StockTransactionType;
}

export async function editStockTransactionPriceQuantityType({
	stockTransactionId,
	price,
	quantity,
	type
}: UpdateStockTransactionArgs) {
	await prisma.stockTransactionLog.update({
		where: { id: stockTransactionId },
		data: {
			price,
			quantity,
			transactionType: type
		}
	});
	return;
}

export async function editStockTransactionMemo(stockTransactionId: number, memo: string) {
	await prisma.stockTransactionLog.update({
		where: { id: stockTransactionId },
		data: { memo }
	});
	return;
}