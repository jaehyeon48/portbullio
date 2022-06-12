import { useQuery } from 'react-query';
import getCashTransactionLogs from '@api/cash/getCashTransactionLogs';
import { portfolioKeys } from '@lib/reactQuery/queryKeyFactories';

export default function useCashTransactionList(portfolioId: number) {
	return useQuery(portfolioKeys.cash(portfolioId), () => getCashTransactionLogs(portfolioId), {
		staleTime: Infinity
	});
}
