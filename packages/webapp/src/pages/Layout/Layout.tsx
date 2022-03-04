import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar, PageContainer, SearchStocks } from '@components/index';

export default function Layout() {
	const navigate = useNavigate();

	function routeToStockPage(ticker: string) {
		navigate(`/stock/${ticker}/overview`);
	}

	return (
		<>
			<Navbar />
			<PageContainer>
				<SearchStocksContainer>
					<SearchStocks onResultClick={routeToStockPage} />
				</SearchStocksContainer>
				<Outlet />
			</PageContainer>
		</>
	);
}

const SearchStocksContainer = styled.div`
	width: 50%;
	min-width: 400px;
	max-width: 500px;
	margin: 12px 10px 18px auto;
`;
