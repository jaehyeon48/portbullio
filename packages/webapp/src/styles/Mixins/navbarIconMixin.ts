import { css } from 'styled-components';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';

export interface NavbarIconMixinProps {
	applyStrokeStyle?: boolean;
}

export const navbarIconMixin = css<NavbarIconMixinProps>`
	& > p {
		margin-top: 0.4em;
		font-size: 13px;
		color: var(--baseTextColor);
	}

	& > svg {
		fill: var(--navbarIconBgColor);
		${({ applyStrokeStyle }) => (applyStrokeStyle ? 'stroke: var(--navbarIconBgColor)' : '')};
	}

	&.active {
		& > p {
			color: var(--primary);
		}
		& > svg {
			fill: var(--primary);
			${({ applyStrokeStyle }) => (applyStrokeStyle ? 'stroke: var(--primary)' : '')};
		}
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		& > svg {
			transform: scale(0.85);
		}
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandscape}px) {
		& > p {
			font-size: 12px;
		}
		& > svg {
			transform: scale(0.8);
		}
	}
`;
