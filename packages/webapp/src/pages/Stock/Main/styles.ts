import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { priceColorMixin } from '@styles/Mixins';
import * as Constants from '@constants/index';
import * as StockPageConst from '../constants';
import { stockPageBaseFontStyle } from '../styles';

const STOCK_LINK_INDICATOR_HEIGHT = '3px';

export const StockMainSection = styled.section`
	position: relative;
	margin: 0 ${StockPageConst.leftAndRightMargins.desktop}px;
	padding: 2em 0 ${STOCK_LINK_INDICATOR_HEIGHT};
	border-bottom: 1px solid ${({ theme }) => theme.stockPage.borderColor};
	max-width: ${StockPageConst.maxWidth}px;
	height: ${StockPageConst.mainSectionHeights.desktop}px;
	${stockPageBaseFontStyle};

	@media screen and (max-width: ${Constants.breakPoints.laptop}) {
		height: ${StockPageConst.mainSectionHeights.laptop}px;
		margin: 0 ${StockPageConst.leftAndRightMargins.laptop}px;
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
	font-size: 0.85em;
	margin-left: 0.45em;
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
	margin: 2.7em 0 0;
`;

export const CurrentPrice = styled.div`
	display: flex;
	align-items: flex-start;
	font-size: 3.2em;
	font-weight: 700;
	margin-right: 0.2em;
	line-height: 1;
`;

export const CurrencySymbol = styled.div`
	font-size: 0.7em;
	color: ${({ theme }) => theme.stockPage.currencySymbol};
`;

export const PriceChangeContainer = styled.div`
	display: flex;
	align-items: center;
	line-height: 1;
	font-size: 1.5em;
`;

export const PriceChange = styled.div`
	display: flex;
	align-items: center;
`;

export const StockMenuSection = styled.div`
	position: absolute;
	bottom: ${STOCK_LINK_INDICATOR_HEIGHT};
`;

export const StockMenuLink = styled(NavLink)`
	position: relative;
	text-decoration: none;
	font-size: 1.1em;
	font-weight: 500;
	margin-right: 3.4em;
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