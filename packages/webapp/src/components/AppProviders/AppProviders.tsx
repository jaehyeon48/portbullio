import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthContextProvider, EventEmitterProvider } from '@hooks/index';
import { SelectPortfolioIdContextProvider } from '@components/index';

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
						<SelectPortfolioIdContextProvider>{children}</SelectPortfolioIdContextProvider>
					</EventEmitterProvider>
				</AuthContextProvider>
			</QueryClientProvider>
		</BrowserRouter>
	);
}
