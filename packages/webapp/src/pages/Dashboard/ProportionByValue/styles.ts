import styled from 'styled-components';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import { CANVAS_PADDING_PX } from '../constants';

export const ProportionByValueChartCanvas = styled.canvas`
	width: 100%;
	height: 410px;
	padding: ${CANVAS_PADDING_PX}px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		height: 380px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		padding: ${CANVAS_PADDING_PX}px 0;
	}
`;
