import { ReactNode } from 'react';
import { SelectedPortfolioIdContextProvider } from '@components/index';
import {
	AuthContextProvider,
	EventEmitterProvider,
	SocketIoContextProvider,
	RealtimeDataContextProvider,
	IsMarketOpenContextProvider
} from '@hooks/index';

interface Props {
	children: ReactNode;
	authContextInitialValue?: boolean;
}

export default function ContextAPIProviders({ children, authContextInitialValue }: Props) {
	return (
		<AuthContextProvider initialValue={authContextInitialValue}>
			<EventEmitterProvider>
				<IsMarketOpenContextProvider>
					<RealtimeDataContextProvider>
						<SelectedPortfolioIdContextProvider>
							<SocketIoContextProvider>{children}</SocketIoContextProvider>
						</SelectedPortfolioIdContextProvider>
					</RealtimeDataContextProvider>
				</IsMarketOpenContextProvider>
			</EventEmitterProvider>
		</AuthContextProvider>
	);
}
