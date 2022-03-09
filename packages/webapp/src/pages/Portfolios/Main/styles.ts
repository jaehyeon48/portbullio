import styled, { css } from 'styled-components';
import buttonMixin from '@styles/Mixins/buttonMixin';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';

interface SetDefaultButtonProps {
	isDefault: boolean;
	isError: boolean;
}

export const PortfolioNameSection = styled.div`
	min-width: 220px;
`;

export const PortfolioPrivacySection = styled.div`
	display: flex;
	align-items: center;
	min-width: 160px;
`;

export const PortfolioAssetSection = styled.div`
	min-width: 240px;
`;

export const PortfolioActionSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	min-width: 300px;

	& > div {
		display: flex;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		justify-content: space-between;
	}
`;

const portfolioActionButtonStyle = css`
	background: none;
	outline: none;
	border: none;
	display: flex;
	align-items: center;
	cursor: pointer;

	& > svg {
		margin: 2px 2px 0 0;
	}
`;

export const DefaultPortfolioButton = styled.button<SetDefaultButtonProps>`
	${portfolioActionButtonStyle};
	color: ${({ isDefault }) => (isDefault ? 'var(--primary)' : 'var(--gray)')};
	color: ${({ isError }) => isError && 'var(--deepRed)'};
	text-decoration: ${({ isError }) => (isError ? 'underline' : '')};
	min-width: 170px;
`;

export const DefaultPortfolioRetryButton = styled.button`
	${buttonMixin};
	color: inherit;
	text-decoration: underline;
`;

export const EditNameButton = styled.button`
	${portfolioActionButtonStyle};
	color: var(--deepOrange);
	margin-right: 14px;
`;

export const DeletePortfolioButton = styled.button`
	${portfolioActionButtonStyle};
	color: var(--deepRed);
`;

export const TogglePrivacyButton = styled.button`
	${buttonMixin};
	text-decoration: underline;
	font-size: 0.8em;
	color: var(--stockPageTextSubColor);
`;
