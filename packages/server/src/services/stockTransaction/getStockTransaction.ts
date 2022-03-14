import prisma from '@lib/prisma';

type SortOrder = 'asc' | 'desc';

export async function getStockTransactionsOfATicker(
	portfolioId: number,
	ticker: string,
	orderByType: SortOrder = 'asc'
) {
	const stockTransactions = await prisma.stockTransactionLog.findMany({
		orderBy: [{ createdAt: 'desc' }, { transactionType: orderByType }],
		where: {
			portfolioId,
			ticker
		}
	});
	return stockTransactions;
}

export async function getAllStockTransactions(portfolioId: number) {
	const stockTransactions = await prisma.stockTransactionLog.findMany({
		orderBy: [{ ticker: 'asc' }, { transactionType: 'desc' }],
		where: {
			portfolioId
		}
	});
	return stockTransactions;
}
