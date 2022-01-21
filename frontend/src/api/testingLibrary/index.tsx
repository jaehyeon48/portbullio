import { ReactElement } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import userEvent from '@testing-library/user-event';

function CustomWrapper({ children, theme }: { children: ReactElement; theme: DefaultTheme }) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { userEvent, CustomWrapper };
