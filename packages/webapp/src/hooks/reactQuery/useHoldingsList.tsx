import { useQuery, useQueryClient } from 'react-query';
import { portfolioKeys } from '@lib/index';
import { getAllHoldings } from '@api/holdings';
import { Holding } from '@portbullio/shared/src/types';

export default function useHoldingsList(portfolioId: number | undefined) {
	const queryClient = useQueryClient();
	return useQuery(portfolioKeys.holdings(portfolioId ?? -1), () => getAllHoldings(portfolioId), {
		staleTime: !portfolioId ? 0 : Infinity,
		refetchOnWindowFocus: false,
		onSuccess: (holdingsList: Holding[]) => {
			queryClient.setQueryData(
				portfolioKeys.tickers(portfolioId ?? -1),
				holdingsList.map(({ ticker }) => ticker)
			);
		}
	});
}
