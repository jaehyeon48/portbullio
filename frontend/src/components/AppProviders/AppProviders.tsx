import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DefaultTheme, ThemeProvider } from 'styled-components';

interface Props {
	children: ReactNode;
	theme: DefaultTheme;
}

export default function AppProviders({ children, theme }: Props) {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</BrowserRouter>
	);
}
