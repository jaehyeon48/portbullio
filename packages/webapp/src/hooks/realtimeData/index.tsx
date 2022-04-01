import * as React from 'react';
import { RealtimeData } from '@portbullio/shared/src/types';

interface ProviderProps {
	children: React.ReactNode;
}

type RealtimeDataUpdater = React.Dispatch<React.SetStateAction<RealtimeData[]>>;

const RealtimeDataContext = React.createContext<RealtimeData[]>([]);
const RealtimeDataUpdateContext = React.createContext<RealtimeDataUpdater | null>(null);

export function RealtimeDataContextProvider({ children }: ProviderProps) {
	const [realtimeData, setRealtimeData] = React.useState<RealtimeData[]>([]);

	return (
		<RealtimeDataContext.Provider value={realtimeData}>
			<RealtimeDataUpdateContext.Provider value={setRealtimeData}>
				{children}
			</RealtimeDataUpdateContext.Provider>
		</RealtimeDataContext.Provider>
	);
}

export function useRealtimeData() {
	const state = React.useContext(RealtimeDataContext);
	if (state === null) throw new Error('Cannot find RealtimeDataContextProvider');
	return state;
}

export function useRealtimeDataUpdate() {
	const state = React.useContext(RealtimeDataUpdateContext);
	if (state === null) throw new Error('Cannot find RealtimeDataUpdateContextProvider');
	return state;
}
