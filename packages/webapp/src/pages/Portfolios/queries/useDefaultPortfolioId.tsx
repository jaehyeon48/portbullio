import { useQuery } from 'react-query';
import { portfolioKeys, toast } from '@lib/index';
import { getDefaultPortfolio } from '@api/portfolio';
import { useEffect } from 'react';

export default function useDefaultPortfolioId() {
	const queryData = useQuery(portfolioKeys.defaultId(), getDefaultPortfolio, {
		staleTime: Infinity,
		refetchOnWindowFocus: false
	});

	useEffect(() => {
		if (queryData.isError)
			toast.error({
				message: '기본 포트폴리오 정보를 불러오지 못했습니다. 다시 시도해 주세요.',
				duration: 5000,
				position: 'topCenter'
			});
	}, [queryData.isError]);

	return { ...queryData };
}
