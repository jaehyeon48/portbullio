import { ReactElement } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import EventEmitterListeners from '@components/EventEmitterListeners';
import PrivateRoute from '@components/PrivateRoute';
import { useAuth } from '@hooks/Auth';
import useCheckSession from '@hooks/checkSession';
import { useEmitter } from '@hooks/EventEmitter';
import useThemeMode from '@hooks/Theme';
import useSocketListeners from '@hooks/socketIo/useSocketListeners';
import useSubscribeTickers from '@hooks/socketIo/useSubscribeTickers';
import AuthErrorPage from '@pages/Auth/AuthError';
import PageBaseLayout from '@pages/BaseLayout';
import CashMainPage from '@pages/Cash/Main';
import DashboardPage from '@pages/Dashboard';
import HoldingsPage from '@pages/Holdings';
import HomeMainPage from '@pages/Home/Main';
import MostActivesFullListPage from '@pages/Home/TopStocksFullList/MostActivesFullList';
import MostGainersFullListPage from '@pages/Home/TopStocksFullList/MostGainersFullList';
import MostLosersFullListPage from '@pages/Home/TopStocksFullList/MostLosersFullList';
import TopStocksDataContextWrapper from '@pages/Home/context/TopStocksDataContextWrapper';
import NotFoundPage from '@pages/NotFound/404';
import InvalidTickerPage from '@pages/NotFound/InvalidTicker';
import PortfoliosPage from '@pages/Portfolios/Main';
import StockMainPage from '@pages/Stock/Main';
import StockChartPage from '@pages/Stock/StockChart';
import StockTransactionsPage from '@pages/StockTransactions/Main';
import UserProfilePage from '@pages/UserProfile';
import WelcomePage from '@pages/Welcome';

import * as Global from '@styles/Global';

function App(): ReactElement {
	useCheckSession({ routePath: '/' });
	useSocketListeners();
	useSubscribeTickers();
	useThemeMode();
	const isAuthenticated = useAuth();
	const navigate = useNavigate();
	const Emitter = useEmitter();

	Emitter.on('LOG_OUT', path => {
		if (path === '/welcome') navigate('/', { replace: true });
	});

	return (
		<EventEmitterListeners>
			<Global.CSSReset />
			<Global.GlobalStyles />
			<Routes>
				<Route path="/" element={<PageBaseLayout />}>
					<Route path="/" element={<TopStocksDataContextWrapper />}>
						<Route index element={<HomeMainPage />} />
						<Route path="most-actives" element={<MostActivesFullListPage />} />
						<Route path="most-gainers" element={<MostGainersFullListPage />} />
						<Route path="most-losers" element={<MostLosersFullListPage />} />
					</Route>
					<Route path="auth-error" element={<AuthErrorPage />} />
					<Route path="welcome" element={<WelcomePage />} />
					<Route path="stock/:ticker" element={<StockMainPage />}>
						<Route path="chart" element={<StockChartPage />} />
					</Route>
					<Route
						path="dashboard"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<DashboardPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="holdings"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<HoldingsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="stock-transactions/:ticker"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<StockTransactionsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="portfolios"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<PortfoliosPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="cash"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<CashMainPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="profile"
						element={
							<PrivateRoute isAllowed={isAuthenticated}>
								<UserProfilePage />
							</PrivateRoute>
						}
					/>
				</Route>
				<Route path="/invalid-ticker" element={<InvalidTickerPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</EventEmitterListeners>
	);
}

export default App;
