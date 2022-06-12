import { Outlet } from 'react-router-dom';
import { TopStocksDataContextProvider } from './TopStocksData';

export default function HomePageContextRouteWrapper() {
	return (
		<TopStocksDataContextProvider>
			<Outlet />
		</TopStocksDataContextProvider>
	);
}
