import { useQuery } from 'react-query';
import { Holding } from '@portbullio/shared/src/types';
import { portfolioKeys } from '@lib/index';
import { getAllHoldings, getSectors } from '@api/index';
import { useHoldingsTickersUpdate, useHoldingsSectorsUpdate } from '../Holdings';

export default function useHoldingsList(portfolioId: number) {
	const setHoldingsTickers = useHoldingsTickersUpdate();
	const setHoldingsSectors = useHoldingsSectorsUpdate();
	return useQuery(portfolioKeys.holdings(portfolioId), () => getAllHoldings(portfolioId), {
		staleTime: portfolioId === -1 ? 0 : Infinity,
		refetchOnWindowFocus: false,
		onSuccess: async (holdingsList: Holding[]) => {
			const tickers = holdingsList.map(({ ticker }) => ticker);
			setHoldingsTickers(tickers);
			const sectors = await getSectors(tickers);
			setHoldingsSectors(sectors);
		}
	});
}
