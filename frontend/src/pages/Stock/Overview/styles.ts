import styled, { css } from 'styled-components';
import { Card } from '@components/index';
import { breakPoints } from '@constants/index';
import * as StockPageConst from '../constants';
import { stockPageBaseFontStyle } from '../styles';

export const ChartContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	margin: 2em ${StockPageConst.leftAndRightMargins.desktop}px 4em;
	max-width: ${StockPageConst.maxWidth}px;
	${stockPageBaseFontStyle};

	@media screen and (max-width: ${breakPoints.laptop}) {
		margin: 2em ${StockPageConst.leftAndRightMargins.laptop}px 4em;
	}
`;

export const RightPanelContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: ${StockPageConst.rightPanelWidth.desktop}px;
	top: -${StockPageConst.mainSectionHeights.desktop / StockPageConst.rightPanelTopDivideFactor}px;
	right: 0;

	@media screen and (max-width: ${breakPoints.laptop}) {
		top: -${StockPageConst.mainSectionHeights.laptop / StockPageConst.rightPanelTopDivideFactor}px;
	}
`;

const PanelBaseStyle = css`
	padding: 1em 1.2em;
	width: 100%;
`;

export const UpperPanel = styled(Card)`
	${PanelBaseStyle};
	margin-bottom: 4em;
`;

export const LowerPanel = styled(Card)`
	${PanelBaseStyle};
`;

export const PanelItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.1em 0;
`;

export const PanelItemTitle = styled.span`
	color: ${({ theme }) => theme.stockPage.textSubColor};
`;
export const PanelItemValue = styled.span``;
