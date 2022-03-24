import { useQuery } from 'react-query';
import { useHoldingsTickers } from '@hooks/index';
import { getSectors } from '@api/index';
import { useSelectedPortfolioId } from '@components/index';
import { portfolioKeys } from '@lib/index';

export default function useSectors() {
	const portfolioId = useSelectedPortfolioId();
	const tickers = useHoldingsTickers();
	return useQuery(portfolioKeys.sectors(portfolioId), () => getSectors(tickers), {
		staleTime: Infinity
	});
}
