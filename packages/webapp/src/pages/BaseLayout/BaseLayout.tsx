import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NAVBAR_WIDTH } from '@constants/index';
import { Navbar, SearchStocks } from '@components/index';

export default function BaseLayout() {
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

const PageContainer = styled.section`
	position: relative;
	width: calc(100% - ${NAVBAR_WIDTH}px);
	min-height: 100vh;
`;

const SearchStocksContainer = styled.div`
	width: 50%;
	min-width: 400px;
	max-width: 500px;
	margin: 12px 10px 18px auto;
`;
