import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { priceColorMixin } from '@styles/Mixins';
import { breakPoints, globalColors } from '@constants';

const LEFT_AND_RIGHT_MARGIN = '5em';

export const HeaderSection = styled.section`
	margin: 2em ${LEFT_AND_RIGHT_MARGIN} 0;
	font-size: 16px;

	@media screen and (max-width: ${breakPoints.laptop}) {
		font-size: 14px;
	}
`;

export const CompanyName = styled.header`
	color: ${({ theme }) => theme.base.textColor};
	font-weight: 700;
	font-size: 3em;
`;

export const TickerContainer = styled.div`
	display: flex;
	align-items: baseline;
	margin-top: 0.4em;
`;

export const StockExchange = styled.span`
	font-size: 0.9em;
	margin-left: 0.4em;
	color: ${({ theme }) => theme.stockPage.textSubColor};
	line-height: 1;
`;

export const Ticker = styled.span`
	font-size: 1.2em;
	color: ${({ theme }) => theme.stockPage.textSubColor};
	line-height: 1;
`;

export const PriceSection = styled.section`
	display: flex;
	align-items: flex-end;
	${priceColorMixin};
	margin: 3em ${LEFT_AND_RIGHT_MARGIN} 5em;
	font-size: 16px;

	@media screen and (max-width: ${breakPoints.laptop}) {
		font-size: 14px;
	}
`;

export const CurrentPrice = styled.div`
	display: flex;
	align-items: flex-start;
	font-size: 3.2em;
	font-weight: 500;
	margin-right: 0.3em;
	line-height: 1;
`;

export const CurrencySymbol = styled.div`
	font-size: 0.6em;
	color: ${({ theme }) => theme.stockPage.currencySymbol};
`;

export const PriceChangeContainer = styled.div`
	display: flex;
	align-items: center;
	font-size: 1.7em;
	line-height: 1;
`;

export const PriceChange = styled.div`
	display: flex;
	align-items: center;
`;

export const StockMenuSection = styled.div`
	padding: 0 ${LEFT_AND_RIGHT_MARGIN} 5px;
	border-bottom: 1px solid ${({ theme }) => theme.stockPage.borderColor};
	width: 100%;
	font-size: 16px;

	@media screen and (max-width: ${breakPoints.tabletLandscape}) {
		font-size: 14px;
	}
`;

export const StockMenuLink = styled(NavLink)`
	position: relative;
	text-decoration: none;
	font-size: 1.2em;
	font-weight: 500;
	margin-right: 4em;
	color: ${({ theme }) => theme.stockPage.textSubColor};

	&.active {
		color: ${globalColors.primary};

		&::after {
			position: absolute;
			left: 0;
			bottom: -7px;
			content: '';
			border-top: 3px solid ${globalColors.primary};
			width: 100%;
		}
	}
`;
