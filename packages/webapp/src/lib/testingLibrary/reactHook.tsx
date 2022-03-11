import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContextProvider } from '@hooks/Auth';

export const createHookQueryWrapper = () => {
	const queryClient = new QueryClient();
	return function ({ children }: { children: ReactNode }) {
		return (
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>{children}</AuthContextProvider>
			</QueryClientProvider>
		);
	};
};

export * from '@testing-library/react-hooks';
