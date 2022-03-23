import { ReactNode } from 'react';
import { SelectPortfolioIdContextProvider } from '@components/index';
import {
	AuthContextProvider,
	EventEmitterProvider,
	HoldingsTickersContextProvider,
	HoldingsSectorsContextProvider
} from '@hooks/index';

interface Props {
	children: ReactNode;
	authContextInitialValue?: boolean;
}

export default function ContextAPIProviders({ children, authContextInitialValue }: Props) {
	return (
		<AuthContextProvider initialValue={authContextInitialValue}>
			<EventEmitterProvider>
				<SelectPortfolioIdContextProvider>
					<HoldingsTickersContextProvider>
						<HoldingsSectorsContextProvider>{children}</HoldingsSectorsContextProvider>
					</HoldingsTickersContextProvider>
				</SelectPortfolioIdContextProvider>
			</EventEmitterProvider>
		</AuthContextProvider>
	);
}
