import { useQueryClient, useMutation } from 'react-query';
import { CashTransactionLog } from '@prisma/client';
import { editCashTransaction, EditCashTransactionArgs } from '@api/cash/editCashTransaction';
import { portfolioKeys } from '@lib/reactQuery/queryKeyFactories';
import { sortByDate, updateArray } from '@utils';

export default function useEditCashTransaction(portfolioId: number) {
	const queryClient = useQueryClient();

	return useMutation(
		({ cashTransactionId, amount, type, date }: EditCashTransactionArgs) =>
			editCashTransaction({
				cashTransactionId,
				amount,
				type,
				date
			}),
		{
			onSuccess: editedCashTransaction => {
				queryClient.setQueryData<CashTransactionLog[]>(
					portfolioKeys.cash(portfolioId),
					prevCashTransactions =>
						updateArray(
							prevCashTransactions,
							editedCashTransaction,
							el => el.id === editedCashTransaction.id
						).sort((a, b) => sortByDate(a.createdAt, b.createdAt, 'desc'))
				);
			}
		}
	);
}
