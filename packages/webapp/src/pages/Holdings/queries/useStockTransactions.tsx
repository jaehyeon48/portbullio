import { useQuery } from 'react-query';
import { portfolioKeys } from '@lib/index';
import { getStockTransactionLogs } from '@api/holdings';

export default function useStockTransactions(portfolioId: number, ticker: string) {
	return useQuery(
		portfolioKeys.stockTransactions(portfolioId, ticker),
		() => getStockTransactionLogs(portfolioId, ticker),
		{
			staleTime: Infinity,
			refetchOnWindowFocus: false
		}
	);
}
