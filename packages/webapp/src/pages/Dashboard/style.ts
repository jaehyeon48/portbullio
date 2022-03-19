import styled from 'styled-components';
import Card from '@components/Card';
import { priceColorMixin } from '@styles/Mixins';

interface ItemIconBgColorProp {
	bgColor: 'gray' | 'blue';
}

const ITEM_UPPER_LOWER_PADDING_PX = 8;
const PROFIT_LOSS_ASSET_ITEM_HEIGHT_PX = 134;
const PROPORTION_BY_VALUE_CONTAINER_HEIGHT_PX = 450;
const PIE_CHART_CONTAINER_HEIGHT_PX = 400;
const ASSET_HISTORY_CONTAINER_HEIGHT_PX = 420;

export const DashboardContainer = styled.div`
	max-width: 1500px;
	margin: 0 auto;
	padding: 20px 30px;
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

export const ItemIconContainer = styled.div<ItemIconBgColorProp>`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: -13px;
	left: 6px;
	width: 36px;
	height: 36px;
	padding: 4px;
	border-radius: 4px;
	background-color: ${({ bgColor }) =>
		bgColor === 'gray'
			? 'var(--dashboardItemIconBgColorGray)'
			: 'var(--dashboardItemIconBgColorBlue)'};

	& > svg {
		fill: var(--white);
		stroke: var(--white);
	}
`;

export const ItemHeader = styled.h2`
	text-align: center;
	font-size: 18px;
`;

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

export const AmountChange = styled.div`
	display: flex;
	align-items: center;
	margin: 4px 0 0 16px;
	font-size: 16px;
`;

export const ProfitLossAssetPercent = styled.div`
	${priceColorMixin};
	text-align: center;
	margin-top: 14px;
`;

export const ProportionByValueContainer = styled(Card)`
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
	position: relative;
	height: ${PROPORTION_BY_VALUE_CONTAINER_HEIGHT_PX}px;
`;

export const SectorDividendPieChartContainer = styled.div`
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
	position: relative;
	display: flex;
	gap: 30px;
`;

export const SectorPieChartContainer = styled(Card)`
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
	height: ${PIE_CHART_CONTAINER_HEIGHT_PX}px;
`;

export const DividendPieChartContainer = styled(Card)`
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
	height: ${PIE_CHART_CONTAINER_HEIGHT_PX}px;
`;

export const AssetHistoryContainer = styled(Card)`
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
	height: ${ASSET_HISTORY_CONTAINER_HEIGHT_PX}px;
`;
