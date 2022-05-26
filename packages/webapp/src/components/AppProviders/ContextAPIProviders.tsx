import { ReactNode } from 'react';
import { Toast, ToastProvider } from 'super-simple-react-toast';
import {
	AuthContextProvider,
	EventEmitterProvider,
	SocketIoContextProvider,
	RealtimeDataContextProvider,
	IsMarketOpenContextProvider
} from '@hooks/index';
import { SelectedPortfolioIdContextProvider } from '../SelectPortfolio/useSelectedPortfolioId';

interface Props {
	children: ReactNode;
	authContextInitialValue?: boolean;
	connectSocket?: boolean;
}

const toast = new Toast(document.getElementById('toast-root'));

export default function ContextAPIProviders({
	children,
	authContextInitialValue,
	connectSocket
}: Props) {
	return (
		<ToastProvider toastInstance={toast}>
			<AuthContextProvider initialValue={authContextInitialValue}>
				<EventEmitterProvider>
					<IsMarketOpenContextProvider>
						<RealtimeDataContextProvider>
							<SelectedPortfolioIdContextProvider>
								<SocketIoContextProvider shouldConnect={connectSocket}>
									{children}
								</SocketIoContextProvider>
							</SelectedPortfolioIdContextProvider>
						</RealtimeDataContextProvider>
					</IsMarketOpenContextProvider>
				</EventEmitterProvider>
			</AuthContextProvider>
		</ToastProvider>
	);
}
