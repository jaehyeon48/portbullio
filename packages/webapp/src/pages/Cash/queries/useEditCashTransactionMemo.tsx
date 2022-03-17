import { useMutation, useQueryClient } from 'react-query';
import { editCashTransactionMemo } from '@api/cash';
import { CashTransactionLog } from '@prisma/client';
import { updateArray } from '@utils';
import { portfolioKeys } from '@lib/index';

interface EditCashTransactionMemoArgs {
	cashTransactionId: number;
	newMemo: string;
}

export default function useEditCashTransactionMemo(portfolioId: number) {
	const queryClient = useQueryClient();

	return useMutation(
		({ cashTransactionId, newMemo }: EditCashTransactionMemoArgs) =>
			editCashTransactionMemo(cashTransactionId, newMemo),
		{
			onSuccess: ({ editedCashTransaction }) => {
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
