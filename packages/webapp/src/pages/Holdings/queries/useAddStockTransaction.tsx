import { useQueryClient, useMutation } from 'react-query';
import { StockTransactionType, StockTransactionLog } from '@prisma/client';
import { Holding } from '@types';
import { addStockTransaction } from '@api/holdings';
import { updateArray } from '@utils';
import { portfolioKeys } from '@lib/index';

interface AddStockTransactionArgs {
	portfolioId: number;
	ticker: string;
	price: number;
	quantity: number;
	type: StockTransactionType;
	priceDiff?: number;
}

export default function useAddStockTransaction() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, ticker, price, quantity, type, priceDiff }: AddStockTransactionArgs) =>
			addStockTransaction({ portfolioId, price, quantity, ticker, type, priceDiff }),
		{
			onSuccess: ({ holdingsOfTicker, newStockTransaction }, { portfolioId, ticker }) => {
				let shouldInvalidateTransactionQuery = false;

				queryClient.setQueryData<Holding[]>(
					portfolioKeys.holdings(portfolioId),
					prevHoldingsOfTicker =>
						updateArray(
							prevHoldingsOfTicker,
							holdingsOfTicker[0],
							el => el.ticker === holdingsOfTicker[0].ticker
						).sort(sortByTicker)
				);

				queryClient.setQueryData<StockTransactionLog[]>(
					portfolioKeys.stockTransactions(portfolioId, ticker),
					stockTransactionLogs => {
						if (stockTransactionLogs) return [...stockTransactionLogs, newStockTransaction];
						shouldInvalidateTransactionQuery = true;
						return [];
					}
				);

				if (shouldInvalidateTransactionQuery) {
					queryClient.invalidateQueries(portfolioKeys.stockTransactions(portfolioId, ticker));
				}
			}
		}
	);
}

const enCollator = new Intl.Collator('en');
function sortByTicker(a: Holding, b: Holding) {
	return enCollator.compare(a.ticker, b.ticker);
}
