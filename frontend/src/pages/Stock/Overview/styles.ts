import styled, { css } from 'styled-components';
import { Card } from '@components/index';
import * as Constants from '@constants/index';

export const ChartContainer = styled.div`
	margin: 2em ${Constants.stockPageLeftRightMargin.desktop} 4em;

	@media screen and (max-width: ${Constants.breakPoints.laptop}) {
		margin: 2em ${Constants.stockPageLeftRightMargin.laptop} 4em;
	}
`;

export const RightPanelContainer = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	top: ${Constants.stockPageMainSectionHeight.desktop / 1.7}px;
	right: ${Constants.stockPageLeftRightMargin.desktop};

	@media screen and (max-width: ${Constants.breakPoints.laptop}) {
		top: ${Constants.stockPageMainSectionHeight.laptop / 1.7}px;
		right: ${Constants.stockPageLeftRightMargin.laptop};
	}
`;

const PanelBaseStyle = css`
	padding: 1em 1.2em;
	width: 22em;
`;

export const UpperPanel = styled(Card)`
	${PanelBaseStyle};
	margin-bottom: 4em;
`;

export const LowerPanel = styled(Card)`
	${PanelBaseStyle};
`;

export const PanelItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.1em 0;
`;

export const PanelItemTitle = styled.span`
	color: ${({ theme }) => theme.stockPage.textSubColor};
`;
export const PanelItemValue = styled.span``;
