import { SyntheticEvent, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getDefaultPortfolio } from '@api/portfolio';

type ReturnType = [number | undefined, (e: SyntheticEvent) => void];

export default function usePortfolioSelectId(): ReturnType {
	const { data: defaultPortfolioId } = useQuery('defaultPortfolio', getDefaultPortfolio, {
		staleTime: Infinity
	});
	const [selectedPortfolioId, setSelectedPortfolioId] = useState(defaultPortfolioId);

	useEffect(() => {
		setSelectedPortfolioId(defaultPortfolioId);
	}, [defaultPortfolioId]);

	function handleSelectedPortfolioId(e: SyntheticEvent) {
		const target = e.target as HTMLOptionElement;
		setSelectedPortfolioId(Number(target.value));
	}

	return [selectedPortfolioId, handleSelectedPortfolioId];
}
