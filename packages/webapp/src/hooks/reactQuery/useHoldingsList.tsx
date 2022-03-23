import { useQuery } from 'react-query';
import { Holding } from '@portbullio/shared/src/types';
import { portfolioKeys } from '@lib/index';
import { getAllHoldings, getSectors } from '@api/index';
import { useHoldingsTickersUpdate } from './useHoldingsTickers';
import { useHoldingsSectorsUpdate } from '../Holdings';

export default function useHoldingsList(portfolioId: number | undefined) {
	const setHoldingsTickers = useHoldingsTickersUpdate();
	const setHoldingsSectors = useHoldingsSectorsUpdate();
	return useQuery(portfolioKeys.holdings(portfolioId ?? -1), () => getAllHoldings(portfolioId), {
		staleTime: !portfolioId ? 0 : Infinity,
		refetchOnWindowFocus: false,
		onSuccess: async (holdingsList: Holding[]) => {
			const tickers = holdingsList.map(({ ticker }) => ticker);
			setHoldingsTickers(tickers);
			const sectors = await getSectors(tickers);
			setHoldingsSectors(sectors);
		}
	});
}
