import { ReactElement, useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Global from '@styles/Global';
import * as Page from '@pages/index';
import { EventEmitterListeners, PrivateRoute } from '@components/index';
import { checkAuth } from '@api/auth';
import { useAuth, useAuthUpdate, useThemeMode } from '@hooks/index';
import toast from '@lib/toast';

function App(): ReactElement {
	useThemeMode();
	const isAuthenticated = useAuth();
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
		<EventEmitterListeners>
			<Global.CSSReset />
			<Global.GlobalFonts />
			<Global.GlobalStyles />
			<Global.ToastColors />
			<Routes>
				<Route path="/" element={<Page.BaseLayout />}>
					<Route index element={<Page.HomePage />} />
					<Route path="welcome" element={<Page.WelcomePage />} />
					<Route path="stock/:ticker" element={<Page.StockMainPage />}>
						<Route path="overview" element={<Page.StockOverviewPage />} />
					</Route>
					<Route
						path="holdings"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<Page.HoldingsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="stock-transactions/:ticker"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<Page.StockTransactionsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="portfolios"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<Page.PortfoliosPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="cash"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<Page.CashPage />
							</PrivateRoute>
						}
					/>
				</Route>
				<Route path="*" element={<Page.NotFoundPage />} />
			</Routes>
		</EventEmitterListeners>
	);
}

export default App;
