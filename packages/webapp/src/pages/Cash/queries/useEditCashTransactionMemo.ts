import { useMutation, useQueryClient } from 'react-query';
import { CashTransactionLog } from '@prisma/client';
import {
	editCashTransactionMemo,
	EditCashTransactionMemoArgs
} from '@api/cash/editCashTransactionMemo';
import { portfolioKeys } from '@lib/reactQuery/queryKeyFactories';
import { updateArray } from '@utils';

export default function useEditCashTransactionMemo(portfolioId: number) {
	const queryClient = useQueryClient();

	return useMutation(
		({ cashTransactionId, newMemo }: EditCashTransactionMemoArgs) =>
			editCashTransactionMemo({ cashTransactionId, newMemo }),
		{
			onSuccess: editedCashTransaction => {
				queryClient.setQueryData<CashTransactionLog[]>(
					portfolioKeys.cash(portfolioId),
					prevCashTransactionLogs =>
						updateArray(
							prevCashTransactionLogs,
							editedCashTransaction,
							element => element.id === editedCashTransaction.id
						)
				);
			}
		}
	);
}
