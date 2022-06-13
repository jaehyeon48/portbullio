import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useToast } from 'super-simple-react-toast';
import getDefaultPortfolio from '@api/portfolio/getDefaultPortfolio';
import { portfolioKeys } from '@lib/reactQuery/queryKeyFactories';
import { useAuth } from '@hooks/Auth';

export default function useDefaultPortfolioId(showErrorMessage = true) {
	const toast = useToast();
	const isAuthenticated = useAuth();
	const queryData = useQuery(portfolioKeys.defaultId(), getDefaultPortfolio, {
		staleTime: isAuthenticated ? Infinity : 0,
		refetchOnWindowFocus: false,
		retry: isAuthenticated
	});

	useEffect(() => {
		if (queryData.isError && showErrorMessage)
			toast.error({
				message: '기본 포트폴리오 정보를 불러오지 못했습니다. 다시 시도해 주세요.'
			});
	}, [toast, queryData.isError, showErrorMessage]);

	return { ...queryData };
}
