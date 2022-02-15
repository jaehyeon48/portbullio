import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider, EventEmitterProvider } from '@hooks/index';
import userEvent from '@testing-library/user-event';

interface WrapperProps {
	children: ReactElement;
	theme: DefaultTheme;
	authValue?: boolean;
}

const queryClient = new QueryClient();

function CustomWrapper({ children, theme, authValue = false }: WrapperProps) {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider initialValue={authValue}>
					<ThemeProvider theme={theme}>
						<EventEmitterProvider>{children}</EventEmitterProvider>
					</ThemeProvider>
				</AuthContextProvider>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { userEvent, CustomWrapper };
