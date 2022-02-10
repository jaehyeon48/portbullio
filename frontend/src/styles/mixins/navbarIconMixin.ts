import { css } from 'styled-components';
import { breakPoints } from '@constants';
import globalColors from './globalColors';

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
			color: ${globalColors.primary};
		}
		& > svg {
			fill: ${globalColors.primary};
		}
	}

	@media screen and (max-width: ${breakPoints.laptop}) {
		& > svg {
			transform: scale(0.85);
		}
	}

	@media screen and (max-width: ${breakPoints.tabletLandscape}) {
		& > p {
			font-size: 12px;
		}
		& > svg {
			transform: scale(0.8);
		}
	}
`;

export default navbarIconMixin;
