import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const createHookQueryWrapper = () => {
	const queryClient = new QueryClient();
	return function ({ children }: { children: ReactNode }) {
		return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
	};
};

export * from '@testing-library/react-hooks';
