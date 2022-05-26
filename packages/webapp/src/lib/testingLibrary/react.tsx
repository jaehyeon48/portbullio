import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toast, ToastProvider } from 'super-simple-react-toast';
import { ContextAPIProviders } from '@components/index';

interface WrapperProps {
	children: ReactElement;
	authValue?: boolean;
	connectSocket?: boolean;
}

const queryClient = new QueryClient();
const toast = new Toast(document.body);

function CustomWrapper({ children, authValue = false, connectSocket = false }: WrapperProps) {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ToastProvider toastInstance={toast}>
					<ContextAPIProviders authContextInitialValue={authValue} connectSocket={connectSocket}>
						{children}
					</ContextAPIProviders>
				</ToastProvider>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export { CustomWrapper };
