import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { priceColorMixin } from '@styles/Mixins';
import * as Constants from '@constants/index';

const STOCK_LINK_INDICATOR_HEIGHT = '3px';

export const StockMainSection = styled.section`
	position: relative;
	margin: 0 ${Constants.stockPageLeftRightMargin.desktop};
	padding: 2em 0 3px;
	border-bottom: 1px solid ${({ theme }) => theme.stockPage.borderColor};
	height: ${Constants.stockPageMainSectionHeight.desktop}px;

	@media screen and (max-width: ${Constants.breakPoints.laptop}) {
		height: ${Constants.stockPageMainSectionHeight.laptop}px;
		margin: 0 ${Constants.stockPageLeftRightMargin.laptop};
	}
`;

export const HeaderSection = styled.section`
	font-size: 16px;

	@media screen and (max-width: ${Constants.breakPoints.laptop}) {
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
	margin: 3em 0 0;
	font-size: 16px;

	@media screen and (max-width: ${Constants.breakPoints.laptop}) {
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
	position: absolute;
	bottom: ${STOCK_LINK_INDICATOR_HEIGHT};
	width: 100%;
	font-size: 16px;

	@media screen and (max-width: ${Constants.breakPoints.tabletLandscape}) {
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
		color: ${Constants.globalColors.primary};

		&::after {
			position: absolute;
			left: 0;
			bottom: -5px;
			content: '';
			border-top: ${STOCK_LINK_INDICATOR_HEIGHT} solid ${Constants.globalColors.primary};
			width: 100%;
		}
	}
`;
