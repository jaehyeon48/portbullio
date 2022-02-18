import { css } from 'styled-components';
import { breakPoints } from '@constants/index';

const navbarIconMixin = css`
	& > p {
		margin-top: 0.4em;
		font-size: 13px;
		color: var(--baseTextColor);
	}

	& > svg {
		fill: var(--navbarIconBgColor);
	}

	&.active {
		& > p {
			color: var(--primary);
		}
		& > svg {
			fill: var(--primary);
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
