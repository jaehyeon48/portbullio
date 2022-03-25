import styled, { css } from 'styled-components';

interface RatioColorBarProps {
	width: number;
}

const TickerSectionWidthPx = 120;
const ValueSectionWidthPx = 200;
const RatioSectionWidthPx = 150;

export const Container = styled.div`
	padding: 4px;
`;

export const Header = styled.header`
	font-size: 20px;
	text-align: center;
`;

export const DetailsListHeaders = styled.div`
	display: flex;
	font-weight: 700;
	margin: 30px 0 6px;
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
	border-left: 1px solid var(--baseBorderColor);
	border-right: 1px solid var(--baseBorderColor);

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
	border-right: 1px solid var(--baseBorderColor);
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
	border-right: 1px solid var(--baseBorderColor);
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
