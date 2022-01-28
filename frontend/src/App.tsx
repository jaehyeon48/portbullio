import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Global from '@styles/Global';
import { lightTheme, darkTheme } from '@src/styles/Theme';
import useThemeMode from '@hooks/Theme';
import AppProviders from '@components/AppProviders';
import Navbar from '@components/Navbar';
import HomePage from '@src/pages/Home';

function App(): ReactElement {
	const [themeMode] = useThemeMode();
	const theme = themeMode === 'light' ? lightTheme : darkTheme;

	return (
		<AppProviders theme={theme}>
			<Global.CSSReset />
			<Global.GlobalFonts />
			<Global.GlobalStyles />
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</AppProviders>
	);
}

export default App;
