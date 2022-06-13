import { ReactElement, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import EventEmitterListeners from '@components/EventEmitterListeners';
import PrivateRoute from '@components/PrivateRoute';
import SuspenseFallbackSpinner from '@components/SuspenseFallbackSpinner';
import { useAuth } from '@hooks/Auth';
import { useEmitter } from '@hooks/EventEmitter';
import useThemeMode from '@hooks/Theme';
import useCheckSession from '@hooks/checkSession';
import useSocketListeners from '@hooks/socketIo/useSocketListeners';
import useSubscribeTickers from '@hooks/socketIo/useSubscribeTickers';
import PageBaseLayout from '@pages/BaseLayout';
import TopStocksDataContextWrapper from '@pages/Home/context/TopStocksDataContextWrapper';
import HomeMainPage from '@pages/Home/Main';
import * as Global from '@styles/Global';

const MostActivesFullListPage = lazy(
	() => import('@pages/Home/TopStocksFullList/MostActivesFullList')
);
const MostGainersFullListPage = lazy(
	() => import('@pages/Home/TopStocksFullList/MostGainersFullList')
);
const MostLosersFullListPage = lazy(
	() => import('@pages/Home/TopStocksFullList/MostLosersFullList')
);
const AuthErrorPage = lazy(() => import('@pages/Auth/AuthError'));
const WelcomePage = lazy(() => import('@pages/Welcome'));
const StockMainPage = lazy(() => import('@pages/Stock/Main'));
const StockChartPage = lazy(() => import('@pages/Stock/StockChart'));
const DashboardPage = lazy(() => import('@pages/Dashboard'));
const HoldingsPage = lazy(() => import('@pages/Holdings'));
const StockTransactionsPage = lazy(() => import('@pages/StockTransactions/Main'));
const PortfoliosPage = lazy(() => import('@pages/Portfolios/Main'));
const CashMainPage = lazy(() => import('@pages/Cash/Main'));
const UserProfilePage = lazy(() => import('@pages/UserProfile'));
const InvalidTickerPage = lazy(() => import('@pages/NotFound/InvalidTicker'));
const NotFoundPage = lazy(() => import('@pages/NotFound/404'));

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
			<Suspense fallback={<SuspenseFallbackSpinner />}>
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
			</Suspense>
		</EventEmitterListeners>
	);
}

export default App;
