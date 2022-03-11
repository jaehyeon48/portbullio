import * as React from 'react';
import { useQuery } from 'react-query';
import { getDefaultPortfolio } from '@api/portfolio';

type PortfolioIdUpdateFn = (e: React.SyntheticEvent) => void;

interface ProviderProps {
	children: React.ReactNode;
}

const PortfolioIdContext = React.createContext<number | undefined>(undefined);
const PortfolioIdUpdateContext = React.createContext<PortfolioIdUpdateFn | null>(null);

export function SelectPortfolioIdContextProvider({ children }: ProviderProps) {
	const { data: defaultPortfolioId } = useQuery('defaultPortfolio', getDefaultPortfolio, {
		staleTime: Infinity
	});
	const [selectedPortfolioId, setSelectedPortfolioId] = React.useState(defaultPortfolioId);

	React.useEffect(() => {
		setSelectedPortfolioId(defaultPortfolioId);
	}, [defaultPortfolioId]);

	const handleSelectedPortfolioId = React.useCallback((e: React.SyntheticEvent) => {
		const target = e.target as HTMLOptionElement;
		setSelectedPortfolioId(Number(target.value));
	}, []);

	return (
		<PortfolioIdContext.Provider value={selectedPortfolioId}>
			<PortfolioIdUpdateContext.Provider value={handleSelectedPortfolioId}>
				{children}
			</PortfolioIdUpdateContext.Provider>
		</PortfolioIdContext.Provider>
	);
}

export function useSelectPortfolioId() {
	const state = React.useContext(PortfolioIdContext);
	if (state === null) throw new Error('Cannot find PortfolioIdContextProvider');
	return state;
}

export function useSelectPortfolioIdUpdate() {
	const state = React.useContext(PortfolioIdUpdateContext);
	if (state === null) throw new Error('Cannot find PortfolioIdUpdateContextProvider');
	return state;
}
