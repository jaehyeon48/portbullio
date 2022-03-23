import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SelectPortfolioIdContextProvider } from '@components/index';
import {
	AuthContextProvider,
	EventEmitterProvider,
	HoldingsTickersContextProvider,
	HoldingsSectorsContextProvider
} from '@hooks/index';

interface Props {
	children: ReactNode;
}

const queryClient = new QueryClient();

export default function AppProviders({ children }: Props) {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<AuthContextProvider>
					<EventEmitterProvider>
						<SelectPortfolioIdContextProvider>
							<HoldingsTickersContextProvider>
								<HoldingsSectorsContextProvider>{children}</HoldingsSectorsContextProvider>
							</HoldingsTickersContextProvider>
						</SelectPortfolioIdContextProvider>
					</EventEmitterProvider>
				</AuthContextProvider>
			</QueryClientProvider>
		</BrowserRouter>
	);
}
