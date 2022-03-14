import { useQueryClient, useMutation } from 'react-query';
import { StockTransactionLog } from '@prisma/client';
import { Holding } from '@types';
import { addStockTransaction, AddStockTransactionArgs } from '@api/holdings';
import { updateArray } from '@utils';
import { portfolioKeys } from '@lib/index';

export default function useAddStockTransaction() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, ticker, price, quantity, type, avgBuyCost }: AddStockTransactionArgs) =>
			addStockTransaction({ portfolioId, price, quantity, ticker, type, avgBuyCost }),
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
