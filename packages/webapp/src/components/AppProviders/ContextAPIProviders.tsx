import { ReactNode } from 'react';
import { SelectedPortfolioIdContextProvider } from '@components/index';
import {
	AuthContextProvider,
	EventEmitterProvider,
	HoldingsTickersContextProvider,
	SocketIoContextProvider
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
					<HoldingsTickersContextProvider>
						<SocketIoContextProvider>{children}</SocketIoContextProvider>
					</HoldingsTickersContextProvider>
				</SelectedPortfolioIdContextProvider>
			</EventEmitterProvider>
		</AuthContextProvider>
	);
}
