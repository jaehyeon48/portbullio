import { ReactElement, useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Global from '@styles/Global';
import * as Page from '@pages/index';
import { EventListeners } from '@components/index';
import { checkAuth } from '@api/auth';
import { useAuthUpdate } from '@hooks/Auth';
import useThemeMode from '@hooks/Theme';
import toast from '@lib/toast';

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
			<Global.CSSReset />
			<Global.GlobalFonts />
			<Global.GlobalStyles />
			<Routes>
				<Route path="/" element={<Page.Layout />}>
					<Route index element={<Page.HomePage />} />
					<Route path="/welcome" element={<Page.WelcomePage />} />
				</Route>
			</Routes>
		</EventListeners>
	);
}

export default App;
