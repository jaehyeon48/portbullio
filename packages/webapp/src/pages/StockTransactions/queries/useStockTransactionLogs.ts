import { useQuery } from 'react-query';
import getStockTransactionLogs from '@api/holdings/getStockTransactionLogs';
import { portfolioKeys } from '@lib/reactQuery/queryKeyFactories';

export default function useStockTransactionLogs(portfolioId: number, ticker: string) {
	return useQuery(
		portfolioKeys.stockTransactionLogs(portfolioId, ticker),
		() => getStockTransactionLogs(portfolioId, ticker),
		{
			staleTime: Infinity,
			refetchOnWindowFocus: false
		}
	);
}
