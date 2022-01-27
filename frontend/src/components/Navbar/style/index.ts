import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { flexMixin } from '@src/styles/mixins';
import { navbarWidth } from '@constants';

export const Container = styled.aside`
	display: flex;
	flex-direction: column;
	position: sticky;
	top: 0;
	background-color: ${({ theme }) => theme.navbar.bgColor};
	width: ${navbarWidth}px;
	height: 100vh;
`;

export const Top = styled.div`
	position: relative;
	${flexMixin}
	height: 13%;

	& > img {
		position: absolute;
		top: 24px;
	}
`;

export const Middle = styled.div`
	${flexMixin}
	height: 85%;
`;

export const Bottom = styled.div`
	${flexMixin}
	height: 12%;
`;

export const NavLinkWrapper = styled(NavLink)`
	${flexMixin}
	flex-direction: column;
	align-items: center;
	transform: scale(0.9);
	text-decoration: none;

	& > p {
		margin-top: 0.4em;
		font-size: 12px;
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
		& > svg {
			transform: scale(0.8);
		}
	}
`;
