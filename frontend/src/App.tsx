import { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { CSSReset, GlobalFonts, GlobalStyles } from '@components/Styles';
import { lightTheme, darkTheme } from '@constants/Theme';
import useThemeMode from '@hooks/Theme';

function App(): ReactElement {
	const [themeMode] = useThemeMode();
	const theme = themeMode === 'light' ? lightTheme : darkTheme;

	return (
		<ThemeProvider theme={theme}>
			<CSSReset />
			<GlobalFonts />
			<GlobalStyles />
			<p>Hello, world!</p>
		</ThemeProvider>
	);
}

export default App;
