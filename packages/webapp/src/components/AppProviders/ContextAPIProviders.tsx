import { ReactNode } from 'react';
import { SelectedPortfolioIdContextProvider } from '@components/index';
import {
	AuthContextProvider,
	EventEmitterProvider,
	HoldingsTickersContextProvider
} from '@hooks/index';

interface Props {
	children: ReactNode;
	authContextInitialValue?: boolean;
}

export default function ContextAPIProviders({ children, authContextInitialValue }: Props) {
	return (
		<AuthContextProvider initialValue={authContextInitialValue}>
			<EventEmitterProvider>
				<SelectedPortfolioIdContextProvider>
					<HoldingsTickersContextProvider>{children}</HoldingsTickersContextProvider>
				</SelectedPortfolioIdContextProvider>
			</EventEmitterProvider>
		</AuthContextProvider>
	);
}
