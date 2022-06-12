import { useQueryClient, useMutation } from 'react-query';
import { CashTransactionLog } from '@prisma/client';
import { addCashTransaction, AddCashTransactionArgs } from '@api/cash/addCashTransaction';
import { portfolioKeys } from '@lib/reactQuery/queryKeyFactories';
import { sortByDate } from '@utils';

export default function useAddCashTransaction() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, amount, type, date }: AddCashTransactionArgs) =>
			addCashTransaction({ portfolioId, amount, type, date }),
		{
			onSuccess: (newCashTransaction, { portfolioId }) => {
				queryClient.setQueryData<CashTransactionLog[]>(
					portfolioKeys.cash(portfolioId),
					prevCashTransactions =>
						prevCashTransactions
							? [...prevCashTransactions, newCashTransaction].sort((a, b) =>
									sortByDate(a.createdAt, b.createdAt, 'desc')
							  )
							: [newCashTransaction]
				);
			}
		}
	);
}
