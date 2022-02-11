import { ReactElement } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider, EventEmitterProvider } from '@hooks/index';
import userEvent from '@testing-library/user-event';

interface WrapperProps {
	children: ReactElement;
	theme: DefaultTheme;
	authValue?: boolean;
}

function CustomWrapper({ children, theme, authValue = false }: WrapperProps) {
	return (
		<BrowserRouter>
			<AuthContextProvider initialValue={authValue}>
				<ThemeProvider theme={theme}>
					<EventEmitterProvider>{children}</EventEmitterProvider>
				</ThemeProvider>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { userEvent, CustomWrapper };
