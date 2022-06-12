import { useQuery } from 'react-query';
import getExchangeName from '@api/stock/getExchangeName';
import { stockKeys } from '@lib/reactQuery/queryKeyFactories';

export default function useExchangeName(ticker: string) {
	return useQuery(stockKeys.exchangeName(ticker), () => getExchangeName(ticker), {
		staleTime: Infinity
	});
}
