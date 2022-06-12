import { useQuery } from 'react-query';
import getSectors from '@api/stock/getSectors';
import { useSelectedPortfolioId } from '@components/SelectPortfolio/useSelectedPortfolioId';
import useHoldingsList from '@hooks/ReactQuery/useHoldingsList';
import { portfolioKeys } from '@lib/reactQuery/queryKeyFactories';
import { getHoldingsTickers } from '@utils';

export default function useSectors() {
	const portfolioId = useSelectedPortfolioId();
	const tickers = getHoldingsTickers(useHoldingsList(portfolioId).data ?? []);
	return useQuery(portfolioKeys.sectors(portfolioId), () => getSectors(tickers), {
		staleTime: Infinity
	});
}
