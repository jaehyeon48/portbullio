import * as React from 'react';
import { checkIsMarketOpen } from '@api/stock';
import { IsMarketOpen } from '@portbullio/shared/src/types';

interface ProviderProps {
	children: React.ReactNode;
}

type IsMarketOpenContextType = IsMarketOpen | 'loading';
type IsMarketOpenUpdater = React.Dispatch<React.SetStateAction<IsMarketOpenContextType>>;

const IsMarketOpenContext = React.createContext<IsMarketOpenContextType | null>(null);
const IsMarketOpenUpdateContext = React.createContext<IsMarketOpenUpdater | null>(null);

export function IsMarketOpenContextProvider({ children }: ProviderProps) {
	const [isMarketOpen, setIsMarketOpen] = React.useState<IsMarketOpenContextType>('loading');

	React.useLayoutEffect(() => {
		(async () => {
			const initStatus = await checkIsMarketOpen();
			setIsMarketOpen(initStatus);
		})();
	}, []);

	return (
		<IsMarketOpenContext.Provider value={isMarketOpen}>
			<IsMarketOpenUpdateContext.Provider value={setIsMarketOpen}>
				{children}
			</IsMarketOpenUpdateContext.Provider>
		</IsMarketOpenContext.Provider>
	);
}

export function useIsMarketOpen() {
	const state = React.useContext(IsMarketOpenContext);
	if (state === null) throw new Error('Cannot find IsMarketOpenContextProvider');
	return state;
}

export function useIsMarketOpenUpdate() {
	const state = React.useContext(IsMarketOpenUpdateContext);
	if (state === null) throw new Error('Cannot find IsMarketOpenUpdateContextProvider');
	return state;
}
