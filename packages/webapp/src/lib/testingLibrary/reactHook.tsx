import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ContextAPIProviders } from '@components/index';

export const createHookQueryWrapper = () => {
	const queryClient = new QueryClient();
	return function ({ children }: { children: ReactNode }) {
		return (
			<QueryClientProvider client={queryClient}>
				<ContextAPIProviders>{children}</ContextAPIProviders>
			</QueryClientProvider>
		);
	};
};

export * from '@testing-library/react-hooks';
