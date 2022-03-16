import { useQueryClient, useMutation } from 'react-query';
import { StockTransactionLog } from '@prisma/client';
import { Holding } from '@portbullio/shared/src/types';
import { addStockTransaction, AddStockTransactionArgs } from '@api/holdings';
import { updateArray, sortByString, sortByDate } from '@utils';
import { portfolioKeys } from '@lib/index';

export default function useAddStockTransaction() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, ticker, price, quantity, type, avgBuyCost, date }: AddStockTransactionArgs) =>
			addStockTransaction({ portfolioId, price, quantity, ticker, type, avgBuyCost, date }),
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
						).sort((a, b) => sortByString(a.ticker, b.ticker))
				);

				queryClient.setQueryData<StockTransactionLog[]>(
					portfolioKeys.stockTransactions(portfolioId, ticker),
					prevStockTransactionLogs => {
						if (prevStockTransactionLogs) {
							return [...prevStockTransactionLogs, newStockTransaction].sort((a, b) =>
								sortByDate(a.createdAt, b.createdAt, 'desc')
							);
						}

						// 해당 종목의 거래내역을 처음으로 추가한 것인지, 아니면 단순히 캐시가 존재하지
						// 않는 것인지 모르므로 거래내역을 invalidate 함.
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
