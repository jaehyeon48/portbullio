import * as React from 'react';
import { getMarketStatus } from '@api/stock';
import { MarketStatus } from '@portbullio/shared/src/types';

interface ProviderProps {
	children: React.ReactNode;
}

type MarketStatusContextType = MarketStatus | 'loading';
type MarketStatusUpdater = React.Dispatch<React.SetStateAction<MarketStatusContextType>>;

const MarketStatusContext = React.createContext<MarketStatusContextType>('loading');
const MarketStatusUpdateContext = React.createContext<MarketStatusUpdater | null>(null);

export function MarketStatusContextProvider({ children }: ProviderProps) {
	const [marketStatus, setMarketStatus] = React.useState<MarketStatusContextType>('loading');

	React.useLayoutEffect(() => {
		(async () => {
			const initStatus = await getMarketStatus();
			setMarketStatus(initStatus);
		})();
	}, []);

	return (
		<MarketStatusContext.Provider value={marketStatus}>
			<MarketStatusUpdateContext.Provider value={setMarketStatus}>
				{children}
			</MarketStatusUpdateContext.Provider>
		</MarketStatusContext.Provider>
	);
}

export function useMarketStatus() {
	const state = React.useContext(MarketStatusContext);
	if (state === null) throw new Error('Cannot find MarketStatusContextProvider');
	return state;
}

export function useMarketStatusUpdate() {
	const state = React.useContext(MarketStatusUpdateContext);
	if (state === null) throw new Error('Cannot find MarketStatusUpdateContextProvider');
	return state;
}
