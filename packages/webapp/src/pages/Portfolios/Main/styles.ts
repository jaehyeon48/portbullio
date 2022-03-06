import styled, { css } from 'styled-components';
import buttonMixin from '@styles/Mixins/buttonMixin';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';

interface SetDefaultButtonProps {
	isDefault: boolean;
}

export const PortfolioNameSection = styled.div`
	width: 25%;
	min-width: 220px;
`;

export const PortfolioPrivacySection = styled.div`
	width: 15%;
	display: flex;
	align-items: center;
	min-width: 140px;
`;

export const PortfolioAssetSection = styled.div`
	width: 25%;
	min-width: 200px;
`;

export const PortfolioActionSection = styled.div`
	width: 35%;
	display: flex;
	justify-content: space-evenly;
	min-width: 320px;

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

export const SetDefaultButton = styled.button<SetDefaultButtonProps>`
	${portfolioActionButtonStyle};
	width: 142px;
	color: ${({ isDefault }) => (isDefault ? 'var(--primary)' : 'var(--gray)')};
`;

export const EditNameButton = styled.button`
	${portfolioActionButtonStyle};
	color: var(--deepOrange);
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
