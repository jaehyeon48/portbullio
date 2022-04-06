import styled, { css } from 'styled-components';
import Card from '@components/Card';
import { ITEM_UPPER_LOWER_PADDING_PX, CANVAS_PADDING_PX } from '../styles';

interface RatioColorBarProps {
	width: number;
}

const PROPORTION_BY_VALUE_CONTAINER_HEIGHT_PX = 500;
const TickerSectionWidthPx = 120;
const ValueSectionWidthPx = 200;
const RatioSectionWidthPx = 150;

export const ProportionByValueSection = styled.section`
	display: flex;
	gap: 30px;
	width: 100%;
`;

export const ProportionByValueChartContainer = styled(Card)`
	width: 60%;
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
	position: relative;
	height: ${PROPORTION_BY_VALUE_CONTAINER_HEIGHT_PX}px;
`;

export const ProportionByValueChartCanvas = styled.canvas`
	width: 100%;
	height: calc(
		${PROPORTION_BY_VALUE_CONTAINER_HEIGHT_PX}px - ${ITEM_UPPER_LOWER_PADDING_PX * 2}px - 1.1em *
			1.5
	);
	padding: ${CANVAS_PADDING_PX}px;
`;

export const DetailsContainer = styled(Card)`
	width: 40%;
	padding: 4px;
	height: ${PROPORTION_BY_VALUE_CONTAINER_HEIGHT_PX}px;
`;

export const DetailsListHeaders = styled.div`
	display: flex;
	font-weight: 700;
	margin: 10px 0 6px;
`;

export const DetailsListTickerHeader = styled.div`
	width: ${TickerSectionWidthPx}px;
	padding-left: 4px;
`;

export const DetailsListValueHeader = styled.div`
	width: ${ValueSectionWidthPx}px;
	padding-left: 4px;
`;

export const DetailsListRatioHeader = styled.div`
	width: ${RatioSectionWidthPx}px;
	padding-left: 4px;
`;

export const DetailsList = styled.ul`
	list-style-type: none;
	padding: 0;
`;

export const DetailsItem = styled.li`
	display: flex;
	border-bottom: 1px solid var(--baseBorderColor);

	&:first-child {
		border-top: 1px solid var(--baseBorderColor);
	}
`;

const listItemStyle = css`
	padding: 4px 6px;
`;

export const Ticker = styled.div`
	${listItemStyle};
	position: relative;
	width: ${TickerSectionWidthPx}px;
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

export const Value = styled.div`
	${listItemStyle};
	width: ${ValueSectionWidthPx}px;
`;

export const Ratio = styled.div`
	${listItemStyle};
	padding: 4px 0;
	position: relative;
	width: ${RatioSectionWidthPx}px;
`;

export const RatioColorBar = styled.div<RatioColorBarProps>`
	height: 100%;
	width: ${({ width }) => width}%;
	background: var(--dashboardDetailsPageRatioBar);
`;

export const RatioText = styled.p`
	position: absolute;
	top: 3px;
	left: 4px;
	z-index: 1;
`;
