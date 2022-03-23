import * as React from 'react';
import { SectorInfo } from '@types';

type HoldingsSectorsUpdateState = React.Dispatch<React.SetStateAction<SectorInfo[]>>;

interface ProviderProps {
	children: React.ReactNode;
}

const HoldingsSectorsContext = React.createContext<SectorInfo[] | null>(null);
const HoldingsSectorsUpdateContext = React.createContext<HoldingsSectorsUpdateState | null>(null);

export function HoldingsSectorsContextProvider({ children }: ProviderProps) {
	const [holdingsSectors, setHoldingsSectors] = React.useState<SectorInfo[]>([]);

	return (
		<HoldingsSectorsContext.Provider value={holdingsSectors}>
			<HoldingsSectorsUpdateContext.Provider value={setHoldingsSectors}>
				{children}
			</HoldingsSectorsUpdateContext.Provider>
		</HoldingsSectorsContext.Provider>
	);
}

export function useHoldingsSectors() {
	const state = React.useContext(HoldingsSectorsContext);
	if (state === null) throw new Error('Cannot find HoldingsSectorsProvider');
	return state;
}

export function useHoldingsSectorsUpdate() {
	const state = React.useContext(HoldingsSectorsUpdateContext);
	if (state === null) throw new Error('Cannot find HoldingsSectorsUpdateProvider');
	return state;
}
