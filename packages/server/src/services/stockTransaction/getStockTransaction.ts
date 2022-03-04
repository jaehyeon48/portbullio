import prisma from '@lib/prisma';

export async function getStockTransactionsOfATicker(portfolioId: number, ticker: string) {
	const stockTransactions = await prisma.stockTransactionLog.findMany({
		where: {
			portfolioId,
			ticker
		}
	});
	return stockTransactions;
}

export async function getAllStockTransactions(portfolioId: number) {
	const stockTransactions = await prisma.stockTransactionLog.findMany({
		where: {
			portfolioId
		}
	});
	return stockTransactions;
}
