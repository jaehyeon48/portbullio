import * as React from 'react';

type HoldingsTickersUpdateState = React.Dispatch<React.SetStateAction<string[]>>;

interface ProviderProps {
	children: React.ReactNode;
}

const HoldingsTickersContext = React.createContext<string[] | null>(null);
const HoldingsTickersUpdateContext = React.createContext<HoldingsTickersUpdateState | null>(null);

export function HoldingsTickersContextProvider({ children }: ProviderProps) {
	const [holdingsTickers, setHoldingsTickers] = React.useState<string[]>([]);

	return (
		<HoldingsTickersContext.Provider value={holdingsTickers}>
			<HoldingsTickersUpdateContext.Provider value={setHoldingsTickers}>
				{children}
			</HoldingsTickersUpdateContext.Provider>
		</HoldingsTickersContext.Provider>
	);
}

export function useHoldingsTickers() {
	const state = React.useContext(HoldingsTickersContext);
	if (state === null) throw new Error('Cannot find HoldingsTickersProvider');
	return state;
}

export function useHoldingsTickersUpdate() {
	const state = React.useContext(HoldingsTickersUpdateContext);
	if (state === null) throw new Error('Cannot find HoldingsTickersUpdateProvider');
	return state;
}
