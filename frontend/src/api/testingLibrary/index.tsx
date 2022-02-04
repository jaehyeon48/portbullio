import { ReactElement } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '@hooks/Auth';
import userEvent from '@testing-library/user-event';

function CustomWrapper({ children, theme }: { children: ReactElement; theme: DefaultTheme }) {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { userEvent, CustomWrapper };
