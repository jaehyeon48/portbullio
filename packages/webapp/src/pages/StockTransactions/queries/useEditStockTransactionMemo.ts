import { useMutation, useQueryClient } from 'react-query';
import { StockTransactionLog } from '@prisma/client';
import {
	editStockTransactionMemo,
	EditStockTransactionMemoArgs
} from '@api/holdings/editStockTransactionMemo';
import { portfolioKeys } from '@lib/reactQuery/queryKeyFactories';
import { updateArray } from '@utils';

export default function useEditStockTransactionMemo(portfolioId: number, ticker: string) {
	const queryClient = useQueryClient();

	return useMutation(
		({ stockTransactionId, newMemo }: EditStockTransactionMemoArgs) =>
			editStockTransactionMemo({ stockTransactionId, newMemo }),
		{
			onSuccess: updatedTransaction => {
				queryClient.setQueryData<StockTransactionLog[]>(
					portfolioKeys.stockTransactionLogs(portfolioId, ticker),
					prevStockTransactions =>
						updateArray(
							prevStockTransactions,
							updatedTransaction,
							element => element.id === updatedTransaction.id
						)
				);
			}
		}
	);
}
