import styled, { css } from 'styled-components';
import buttonMixin from '@styles/Mixins/buttonMixin';
import { breakPoints } from '@constants/breakPoints';

interface SetDefaultButtonProps {
	isDefault: boolean;
}

export const PortfolioNameSection = styled.div`
	width: 25%;
`;

export const PortfolioPrivacySection = styled.div`
	width: 15%;
	display: flex;
	align-items: center;
`;

export const PortfolioAssetSection = styled.div`
	width: 25%;
`;

export const PortfolioActionSection = styled.div`
	width: 35%;
	display: flex;
	justify-content: space-evenly;

	@media screen and (max-width: ${breakPoints.laptop}) {
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
