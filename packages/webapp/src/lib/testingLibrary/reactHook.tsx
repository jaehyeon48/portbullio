import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
	AuthContextProvider,
	HoldingsTickersContextProvider,
	HoldingsSectorsContextProvider
} from '@hooks/index';

export const createHookQueryWrapper = () => {
	const queryClient = new QueryClient();
	return function ({ children }: { children: ReactNode }) {
		return (
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<HoldingsTickersContextProvider>
						<HoldingsSectorsContextProvider>{children}</HoldingsSectorsContextProvider>
					</HoldingsTickersContextProvider>
				</AuthContextProvider>
			</QueryClientProvider>
		);
	};
};

export * from '@testing-library/react-hooks';
