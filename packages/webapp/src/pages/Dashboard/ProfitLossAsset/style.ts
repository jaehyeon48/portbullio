import styled from 'styled-components';
import Card from '@components/Card';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import { priceColorMixin } from '@styles/Mixins';
import { ITEM_UPPER_LOWER_PADDING_PX } from '../constants';

export const ProfitLossAssetContainer = styled.section`
	display: flex;
	justify-content: space-evenly;
	gap: 30px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		flex-direction: column;
	}
`;

export const ProfitLossAssetItem = styled(Card)`
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 134px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		height: 126px;
	}
`;

export const ProfitLossAssetAmount = styled.div`
	${priceColorMixin};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	font-weight: 500;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 20px;
	}
`;

export const ProfitLossAssetPercent = styled.div`
	${priceColorMixin};
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;
