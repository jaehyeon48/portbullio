import { useQuery } from 'react-query';
import { portfolioKeys } from '@lib/index';
import { getAllHoldings } from '@api/holdings';

export default function useHoldingsList(portfolioId: number | undefined) {
	return useQuery(portfolioKeys.holdings(portfolioId ?? -1), () => getAllHoldings(portfolioId), {
		staleTime: !portfolioId ? 0 : Infinity,
		refetchOnWindowFocus: false
	});
}
