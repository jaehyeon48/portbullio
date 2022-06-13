import { useQuery } from 'react-query';
import getPortfolios from '@api/portfolio/getPortfolios';
import { portfolioKeys } from '@lib/reactQuery/queryKeyFactories';

export default function usePortfolioList() {
	return useQuery(portfolioKeys.all, getPortfolios, { staleTime: Infinity });
}
