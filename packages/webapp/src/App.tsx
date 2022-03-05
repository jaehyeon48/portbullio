import { ReactElement, useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Global from '@styles/Global';
import * as Page from '@pages/index';
import { EventListeners } from '@components/index';
import { checkAuth } from '@api/auth';
import { useAuthUpdate } from '@hooks/index';
import toast from '@lib/toast';

function App(): ReactElement {
	const setAuth = useAuthUpdate();

	useLayoutEffect(() => {
		async function tryLogIn() {
			const { userId, isInitialLogin } = await checkAuth();

			setAuth(!!userId);
			if (isInitialLogin) {
				toast.success({ message: '성공적으로 로그인 되었습니다.' });
			}
		}

		tryLogIn();
	}, [setAuth]);

	return (
		<EventListeners>
			<Global.CSSReset />
			<Global.GlobalFonts />
			<Global.GlobalStyles />
			<Global.ToastColors />
			<Routes>
				<Route path="/" element={<Page.Layout />}>
					<Route index element={<Page.HomePage />} />
					<Route path="welcome" element={<Page.WelcomePage />} />
					<Route path="stock/:ticker" element={<Page.StockMainPage />}>
						<Route path="overview" element={<Page.StockOverviewPage />} />
					</Route>
					<Route path="holdings" element={<Page.HoldingsPage />} />
					<Route path="portfolios" element={<Page.PortfoliosPage />} />
				</Route>
			</Routes>
		</EventListeners>
	);
}

export default App;
