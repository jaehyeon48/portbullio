import styled from 'styled-components';
import Card from '@components/Card';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import { ITEM_UPPER_LOWER_PADDING_PX } from '../constants';

export const AssetHistoryContainer = styled(Card)`
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
`;

export const AssetHistoryChart = styled.canvas`
	width: 100%;
	height: 380px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		height: 300px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tablet}px) {
		height: 260px;
	}
`;
