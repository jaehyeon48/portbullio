import { ReactElement, useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Global from '@styles/Global';
import Navbar from '@components/Navbar';
import EventListeners from '@components/EventListeners';
import HomePage from '@pages/Home';
import WelcomePage from '@pages/Welcome';
import { checkAuth } from '@api/auth';
import { useAuthUpdate } from '@hooks/Auth';
import useThemeMode from '@hooks/Theme';
import toast from '@lib/toast';
import { GlobalCustomScrollBar } from '@hooks/ScrollBar';

function App(): ReactElement {
	const setAuth = useAuthUpdate();
	const [themeMode] = useThemeMode();

	useLayoutEffect(() => {
		(async () => {
			const { userId, isInitialLogin } = await checkAuth();

			setAuth(!!userId);
			if (isInitialLogin) toast.success('성공적으로 로그인 되었습니다.', themeMode, 'topRight');
		})();
	}, [setAuth, themeMode]);

	return (
		<EventListeners>
			<GlobalCustomScrollBar />
			<Global.CSSReset />
			<Global.GlobalFonts />
			<Global.GlobalStyles />
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/welcome" element={<WelcomePage />} />
			</Routes>
		</EventListeners>
	);
}

export default App;
