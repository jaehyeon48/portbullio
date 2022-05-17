import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MOBILE_NAVBAR_HEIGHT_PX, NAVBAR_WIDTH, WIDTH_BREAK_POINT_PX } from '@constants/index';
import { Navbar, SearchStocks, Footer } from '@components/index';

export default function BaseLayout() {
	const navigate = useNavigate();

	function routeToStockPage(ticker: string) {
		navigate(`/stock/${ticker}/chart`);
	}

	return (
		<>
			<Navbar />
			<PageContainer>
				<SearchStocksContainer>
					<SearchStocks onResultClick={routeToStockPage} />
				</SearchStocksContainer>
				<PageContentWrapper>
					<Outlet />
				</PageContentWrapper>
				<Footer />
			</PageContainer>
		</>
	);
}

const PageContainer = styled.section`
	position: relative;
	width: calc(100% - ${NAVBAR_WIDTH}px);
	min-height: 100vh;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		width: 100%;
		height: 100%;
		margin-top: ${MOBILE_NAVBAR_HEIGHT_PX}px;
	}
`;

const PageContentWrapper = styled.div`
	min-height: calc(100vh - 63px - 92px);

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		min-height: calc(100vh - ${MOBILE_NAVBAR_HEIGHT_PX}px - 92px);
	}
`;

const SearchStocksContainer = styled.div`
	width: 50%;
	min-width: 400px;
	max-width: 500px;
	margin: 12px 10px 18px auto;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		display: none;
	}
`;
