import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ContextAPIProviders } from '@components/index';

interface WrapperProps {
	children: ReactElement;
	authValue?: boolean;
}

const queryClient = new QueryClient();

function CustomWrapper({ children, authValue = false }: WrapperProps) {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ContextAPIProviders authContextInitialValue={authValue}>{children}</ContextAPIProviders>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export { CustomWrapper };
