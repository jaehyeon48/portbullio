import { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import * as Global from '@styles/Global';
import { lightTheme, darkTheme } from '@src/styles/Theme';
import useThemeMode from '@hooks/Theme';

function App(): ReactElement {
	const [themeMode] = useThemeMode();
	const theme = themeMode === 'light' ? lightTheme : darkTheme;

	return (
		<ThemeProvider theme={theme}>
			<Global.CSSReset />
			<Global.GlobalFonts />
			<Global.GlobalStyles />
			<p>Hello, world!</p>
		</ThemeProvider>
	);
}

export default App;
