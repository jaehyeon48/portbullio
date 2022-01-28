import { css } from 'styled-components';

const navbarIconMixin = css`
	& > p {
		margin-top: 0.4em;
		font-size: 13px;
		color: ${({ theme }) => theme.navbar.textColor};
	}

	& > svg {
		fill: ${({ theme }) => theme.base.colors.gray};
	}

	&.active {
		& > p {
			color: ${({ theme }) => theme.globalColors.primary};
		}
		& > svg {
			fill: ${({ theme }) => theme.globalColors.primary};
		}
	}

	@media screen and (max-width: ${({ theme }) => theme.breakPoints.laptop}) {
		& > svg {
			transform: scale(0.85);
		}
	}

	@media screen and (max-width: ${({ theme }) => theme.breakPoints.tabletLandscape}) {
		& > p {
			font-size: 12px;
		}
		& > svg {
			transform: scale(0.8);
		}
	}
`;

export default navbarIconMixin;
