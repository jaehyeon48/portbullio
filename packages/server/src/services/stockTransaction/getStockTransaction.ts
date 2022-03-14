import prisma from '@lib/prisma';

type SortOrder = 'asc' | 'desc';

interface GetStockTransactionsOfATickerArgs {
	portfolioId: number;
	ticker: string;
	orderByDate?: SortOrder;
	orderByType?: SortOrder;
}

export async function getStockTransactionsOfATicker({
	portfolioId,
	ticker,
	orderByDate = 'asc',
	orderByType = 'asc'
}: GetStockTransactionsOfATickerArgs) {
	const orderBy =
		orderByType === 'desc'
			? [{ transactionType: orderByType }, { createdAt: orderByDate }]
			: [{ createdAt: orderByDate }, { transactionType: orderByType }];

	const stockTransactions = await prisma.stockTransactionLog.findMany({
		orderBy,
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
