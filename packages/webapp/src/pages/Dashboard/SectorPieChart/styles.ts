import styled from 'styled-components';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import { CANVAS_PADDING_PX } from '../constants';

interface LegendColorBoxProps {
	backgroundColor: string;
}

export const PieChartContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: space-evenly;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tablet}px) {
		flex-direction: column;
	}
`;

export const PieChartCanvas = styled.canvas`
	aspect-ratio: 1 / 1;
	padding: ${CANVAS_PADDING_PX * 7}px;
	width: 100%;
	height: 410px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		height: 380px;
	}
`;

export const LegendContainer = styled.div`
	width: 30%;
	display: flex;
	align-items: center;
	font-size: 14px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 13px;
		width: 100%;
		justify-content: center;
	}
`;

export const LegendList = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

export const LegendListItem = styled.li`
	display: flex;
	align-items: center;
	gap: 10px;

	& + & {
		margin-top: 12px;
	}
`;

export const LegendColorBox = styled.div<LegendColorBoxProps>`
	width: 30px;
	height: 14px;
	background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const LegendItemText = styled.span``;
