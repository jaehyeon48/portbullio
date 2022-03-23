import { useQuery } from 'react-query';
import { portfolioKeys } from '@lib/index';
import { getAllHoldings } from '@api/holdings';
import { Holding } from '@portbullio/shared/src/types';
import { useHoldingsTickersUpdate } from './useHoldingsTickers';

export default function useHoldingsList(portfolioId: number | undefined) {
	const setHoldingsTickers = useHoldingsTickersUpdate();
	return useQuery(portfolioKeys.holdings(portfolioId ?? -1), () => getAllHoldings(portfolioId), {
		staleTime: !portfolioId ? 0 : Infinity,
		refetchOnWindowFocus: false,
		onSuccess: (holdingsList: Holding[]) => {
			setHoldingsTickers(holdingsList.map(({ ticker }) => ticker));
		}
	});
}
