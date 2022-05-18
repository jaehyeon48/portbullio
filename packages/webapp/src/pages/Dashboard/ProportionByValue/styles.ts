import styled from 'styled-components';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';

export const ProportionByValueChartCanvas = styled.canvas`
	width: 100%;
	height: 410px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		height: 380px;
	}
`;
