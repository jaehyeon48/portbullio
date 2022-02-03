import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Global from '@styles/Global';
import { lightTheme, darkTheme } from '@src/styles/Theme';
import useThemeMode from '@hooks/Theme';
import AppProviders from '@components/AppProviders';
import Navbar from '@components/Navbar';
import HomePage from '@pages/Home';
import WelcomePage from '@pages/Welcome';

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
				<Route path="/welcome" element={<WelcomePage />} />
			</Routes>
		</AppProviders>
	);
}

export default App;
