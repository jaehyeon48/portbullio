import { useQueryClient, useMutation } from 'react-query';
import { StockTransactionLog } from '@prisma/client';
import { Holding } from '@types';
import { editStockTransaction, EditStockTransactionArgs } from '@api/holdings';
import { updateArray } from '@utils';
import { portfolioKeys } from '@lib/index';

export default function useEditStockTransaction() {
	const queryClient = useQueryClient();

	return useMutation(
		({
			stockTransactionId,
			portfolioId,
			ticker,
			price,
			quantity,
			type,
			avgBuyCost,
			date
		}: EditStockTransactionArgs) =>
			editStockTransaction({
				stockTransactionId,
				portfolioId,
				price,
				quantity,
				ticker,
				type,
				avgBuyCost,
				date
			}),
		{
			onSuccess: ({ holdingsOfTicker, modifiedStockTransaction }, { portfolioId, ticker }) => {
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
					prevStockTransactions =>
						updateArray(
							prevStockTransactions,
							modifiedStockTransaction,
							el => el.id === modifiedStockTransaction.id
						)
				);
			}
		}
	);
}

const enCollator = new Intl.Collator('en');
function sortByTicker(a: Holding, b: Holding) {
	return enCollator.compare(a.ticker, b.ticker);
}
