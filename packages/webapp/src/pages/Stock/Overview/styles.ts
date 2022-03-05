import styled, { css } from 'styled-components';
import { Card } from '@components/index';
import { breakPoints } from '@constants/index';
import { stockPageBaseFontStyle } from '../styles';
import {
	PAGE_MAX_WIDTH,
	LEFT_AND_RIGHT_MARGIN,
	RIGHT_PANEL_WIDTH,
	MAIN_SECTION_HEIGHT,
	RIGHT_PANEL_TOP_DIVIDE_FACTOR
} from '../constants';

export const ChartContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	margin: 2em ${LEFT_AND_RIGHT_MARGIN.desktop}px 4em;
	max-width: ${PAGE_MAX_WIDTH}px;
	${stockPageBaseFontStyle};

	@media screen and (max-width: ${breakPoints.laptop}) {
		margin: 2em ${LEFT_AND_RIGHT_MARGIN.laptop}px 4em;
	}
`;

export const RightPanelContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: ${RIGHT_PANEL_WIDTH.desktop}px;
	top: -${MAIN_SECTION_HEIGHT.desktop / RIGHT_PANEL_TOP_DIVIDE_FACTOR}px;
	right: 0;

	@media screen and (max-width: ${breakPoints.laptop}) {
		top: -${MAIN_SECTION_HEIGHT.laptop / RIGHT_PANEL_TOP_DIVIDE_FACTOR}px;
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
	color: var(--stockPageTextSubColor);
`;
export const PanelItemValue = styled.span``;
