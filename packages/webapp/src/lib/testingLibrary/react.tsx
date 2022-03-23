import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { SelectPortfolioIdContextProvider } from '@components/index';
import {
	AuthContextProvider,
	EventEmitterProvider,
	HoldingsTickersContextProvider,
	HoldingsSectorsContextProvider
} from '@hooks/index';
import userEvent from '@testing-library/user-event';

interface WrapperProps {
	children: ReactElement;
	authValue?: boolean;
}

const queryClient = new QueryClient();

function CustomWrapper({ children, authValue = false }: WrapperProps) {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider initialValue={authValue}>
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

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { userEvent, CustomWrapper };
