import * as React from 'react';
import { useDefaultPortfolioId } from '@hooks/ReactQuery';

type PortfolioIdUpdateFn = (e: React.SyntheticEvent) => void;

interface ProviderProps {
	children: React.ReactNode;
}

const PortfolioIdContext = React.createContext<number>(-1);
const PortfolioIdUpdateContext = React.createContext<PortfolioIdUpdateFn | null>(null);

export function SelectPortfolioIdContextProvider({ children }: ProviderProps) {
	const defaultPortfolioId = useDefaultPortfolioId(false);
	const [selectedPortfolioId, setSelectedPortfolioId] = React.useState(
		defaultPortfolioId.data ?? -1
	);

	React.useEffect(() => {
		setSelectedPortfolioId(defaultPortfolioId.data ?? -1);
	}, [defaultPortfolioId.data]);

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
