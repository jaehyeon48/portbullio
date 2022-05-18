import styled from 'styled-components';
import Card from '@components/Card';
import { priceColorMixin } from '@styles/Mixins';
import { ITEM_UPPER_LOWER_PADDING_PX } from '../styles';

const PROFIT_LOSS_ASSET_ITEM_HEIGHT_PX = 134;

export const ProfitLossAssetContainer = styled.section`
	display: flex;
	justify-content: space-evenly;
	gap: 30px;
`;

export const ProfitLossAssetItem = styled(Card)`
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
	position: relative;
	display: flex;
	flex-direction: column;
	height: ${PROFIT_LOSS_ASSET_ITEM_HEIGHT_PX}px;
`;

export const ProfitLossAssetAmount = styled.div`
	${priceColorMixin};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 17px;
	padding: 0 5%;
	font-size: 24px;
	font-weight: 500;
`;

export const ProfitLossAssetPercent = styled.div`
	${priceColorMixin};
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	margin-top: 14px;
`;
