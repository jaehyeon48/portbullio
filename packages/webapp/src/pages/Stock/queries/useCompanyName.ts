import { useQuery } from 'react-query';
import getCompanyName from '@api/stock/getCompanyName';
import { stockKeys } from '@lib/reactQuery/queryKeyFactories';

export default function useCompanyName(ticker: string) {
	return useQuery(stockKeys.companyName(ticker), () => getCompanyName(ticker), {
		staleTime: Infinity
	});
}
