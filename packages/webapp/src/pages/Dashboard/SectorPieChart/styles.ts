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
	width: 300px;
	height: 300px;
	margin: 0 auto;
	padding: ${CANVAS_PADDING_PX}px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		width: 280px;
		height: 280px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		width: 240px;
		height: 240px;
	}
`;

export const LegendContainer = styled.div`
	width: 30%;
	display: flex;
	align-items: center;
	font-size: 14px;
	max-width: 310px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 13px;
		width: 100%;
		max-width: none;
		margin-top: 12px;
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
