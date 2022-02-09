import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@src/styles/Theme';
import { useThemeMode, AuthContextProvider, EventEmitterProvider } from '@hooks/index';

interface Props {
	children: ReactNode;
}

export default function AppProviders({ children }: Props) {
	const [themeMode] = useThemeMode();
	const theme = themeMode === 'light' ? lightTheme : darkTheme;

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<AuthContextProvider>
					<EventEmitterProvider>{children}</EventEmitterProvider>
				</AuthContextProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}
