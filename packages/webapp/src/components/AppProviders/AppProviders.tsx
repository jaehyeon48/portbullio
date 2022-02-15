import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@styles/Theme';
import { useThemeMode, AuthContextProvider, EventEmitterProvider } from '@hooks/index';

interface Props {
	children: ReactNode;
}

const queryClient = new QueryClient();

export default function AppProviders({ children }: Props) {
	const [themeMode] = useThemeMode();
	const theme = themeMode === 'light' ? lightTheme : darkTheme;

	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<ThemeProvider theme={theme}>
					<AuthContextProvider>
						<EventEmitterProvider>{children}</EventEmitterProvider>
					</AuthContextProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</BrowserRouter>
	);
}
