import styled, { css } from 'styled-components';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import Card from '@components/Card';
import { ITEM_UPPER_LOWER_PADDING_PX } from './constants';

const DETAIL_LIST_INDEX_ITEM_WIDTH_PX = 130;
const DETAIL_LIST_DATA_ITEM_WIDTH_PX = 200;
const DETAIL_LIST_DATA_ITEM_WIDTH_PX_TABLET_LANDSCAPE = 240;

interface ItemIconBgColorProp {
	bgColor: 'gray' | 'blue';
}

interface RatioColorBarProps {
	width: number;
}

interface DetailsListContainerProps {
	baseHeight: number;
}

const detailListItemStyle = css`
	padding: 4px 6px;
`;

export const DashboardContainer = styled.div`
	max-width: 1500px;
	margin: 0 auto;
	padding: 20px 30px;
	display: flex;
	flex-direction: column;
	gap: 40px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		padding: 20px 14px 30px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		padding: 20px 4px 40px;
	}
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

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		font-size: 16px;
	}
`;

export const PortfolioSelectContainer = styled.div`
	margin-left: auto;

	& > select {
		margin: 0;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		margin: 0 auto;
	}
`;

export const SelectNumOfItemsContainer = styled.div`
	position: absolute;
	top: ${ITEM_UPPER_LOWER_PADDING_PX}px;
	right: ${ITEM_UPPER_LOWER_PADDING_PX}px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

export const Select = styled.select`
	background-color: var(--navbarBgColor);
	color: var(--baseTextColor);
	outline: none;
	border-radius: 2px;
`;

export const NoticeEmptyHoldingsList = styled.div`
	margin-top: 30px;
	text-align: center;
`;

export const ProportionAndSectorChartSection = styled.section`
	display: flex;
	gap: 30px;
	width: 100%;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		flex-direction: column;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		gap: 40px;
	}
`;

export const ProportionAndSectorChartContainer = styled(Card)`
	display: flex;
	flex-direction: column;
	width: 65%;
	height: 100%;
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 4px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		width: 100%;
	}
`;

export const DetailsContainer = styled(Card)`
	width: 35%;
	height: 100%;
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 4px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		width: 100%;
		height: 310px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		height: 262px;
	}
`;

export const DetailsListContainer = styled.div<DetailsListContainerProps>`
	height: ${({ baseHeight }) => baseHeight}px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		height: 230px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		height: 180px;
	}
`;

export const DetailsListHeaders = styled.div`
	display: flex;
	font-size: 14px;
	font-weight: 700;
	margin: 10px 0 6px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 13px;
	}
`;

export const DetailsListItem = styled.li`
	display: flex;
	border-bottom: 1px solid var(--baseBorderColor);
	font-size: 14px;

	&:first-child {
		border-top: 1px solid var(--baseBorderColor);
	}
`;

export const DetailListIndexItem = styled.div`
	${detailListItemStyle};
	position: relative;
	width: ${DETAIL_LIST_INDEX_ITEM_WIDTH_PX}px;
`;

export const DetailListDataItem = styled.div`
	${detailListItemStyle};
	word-break: break-word;
	width: ${DETAIL_LIST_DATA_ITEM_WIDTH_PX}px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		width: ${DETAIL_LIST_DATA_ITEM_WIDTH_PX_TABLET_LANDSCAPE}px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		width: ${DETAIL_LIST_DATA_ITEM_WIDTH_PX}px;
	}
`;

export const DetailListRatioItem = styled.div`
	${detailListItemStyle};
	position: relative;
	min-width: 150px;
	width: calc(100% - ${DETAIL_LIST_INDEX_ITEM_WIDTH_PX}px - ${DETAIL_LIST_DATA_ITEM_WIDTH_PX}px);

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		width: calc(
			100% - ${DETAIL_LIST_INDEX_ITEM_WIDTH_PX}px -
				${DETAIL_LIST_DATA_ITEM_WIDTH_PX_TABLET_LANDSCAPE}px
		);
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		width: calc(100% - ${DETAIL_LIST_INDEX_ITEM_WIDTH_PX}px - ${DETAIL_LIST_DATA_ITEM_WIDTH_PX}px);
	}
`;

export const DetailListRatioColorBar = styled.div<RatioColorBarProps>`
	height: 100%;
	width: ${({ width }) => width}%;
	background: var(--dashboardDetailsPageRatioBar);
`;

export const DetailListRatioText = styled.p`
	position: absolute;
	top: 3px;
	left: 7px;
	z-index: 1;
`;

export const OthersCategoryNotice = styled.div`
	position: absolute;
	top: 5px;
	right: 6px;
	font-size: 12px;
	background-color: var(--deepOrange);
	color: var(--white);
	border-radius: 2px;
	padding: 2px;
`;
