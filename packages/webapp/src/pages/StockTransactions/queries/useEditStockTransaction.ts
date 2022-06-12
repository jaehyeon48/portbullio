import { useQueryClient, useMutation } from 'react-query';
import { Holding } from '@portbullio/shared/src/types';
import { StockTransactionLog } from '@prisma/client';
import { editStockTransaction, EditStockTransactionArgs } from '@api/holdings/editStockTransaction';
import { portfolioKeys } from '@lib/reactQuery/queryKeyFactories';
import { updateArray, sortByString, sortByDate } from '@utils';

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
						).sort((a, b) => sortByString(a.ticker, b.ticker))
				);

				queryClient.setQueryData<StockTransactionLog[]>(
					portfolioKeys.stockTransactionLogs(portfolioId, ticker),
					prevStockTransactions =>
						updateArray(
							prevStockTransactions,
							modifiedStockTransaction,
							el => el.id === modifiedStockTransaction.id
						).sort((a, b) => sortByDate(a.createdAt, b.createdAt, 'desc'))
				);
			}
		}
	);
}
