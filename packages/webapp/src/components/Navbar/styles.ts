import styled, { css } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { NAVBAR_WIDTH, MOBILE_NAVBAR_HEIGHT_PX } from '@constants/index';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import { flexMixin, flexCenter, navbarIconMixin, buttonMixin } from '@styles/Mixins';

interface NavBurgerButtonProps {
	isNavDropdownOpened: boolean;
}

export const Container = styled.nav`
	display: flex;
	flex-direction: column;
	position: sticky;
	top: 0;
	background-color: var(--navbarBgColor);
	width: ${NAVBAR_WIDTH}px;
	height: 100vh;
	z-index: 2;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		position: fixed;
		top: 0;
		width: 100vw;
		height: ${MOBILE_NAVBAR_HEIGHT_PX}px;
		flex-direction: row;
		align-items: center;
	}
`;

export const Top = styled.div`
	position: relative;
	${flexMixin}
	height: 13%;

	& > img {
		position: absolute;
		top: 24px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		width: 25%;
		min-width: 73px;
		height: 100%;
	}
`;

export const Middle = styled.div`
	height: 85%;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		width: 80%;
		height: 100%;
	}
`;

export const Bottom = styled.div`
	${flexMixin}
	height: 12%;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		width: 20%;
		height: 100%;
	}
`;

export const NavLinksContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		display: none;
	}
`;

export const NavbarLink = styled(NavLink)`
	${flexMixin}
	flex-direction: column;
	align-items: center;
	transform: scale(0.9);
	text-decoration: none;
	${navbarIconMixin};
`;

export const LoginButton = styled.button`
	${buttonMixin};
	${navbarIconMixin};
	${flexCenter};
	flex-direction: column;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		& > svg {
			width: 32px;
			height: 32px;
		}
	}
`;

export const ProfileButton = styled.button`
	${buttonMixin};
	${flexCenter};
	flex-direction: column;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		display: none;
	}
`;

export const NavBurgerButton = styled.button<NavBurgerButtonProps>`
	${buttonMixin};
	${navbarIconMixin};
	display: none;
	${({ isNavDropdownOpened }) => isNavDropdownOpened && 'transform: rotate(90deg);'}

	& > svg {
		${({ isNavDropdownOpened }) => isNavDropdownOpened && 'stroke: var(--primary);'}
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		display: block;
	}
`;

export const ProfileDropdownContainer = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--navbarBgColor);
	border: 1px solid var(--navbarDropdownBorderColor);
	border-radius: 4px;
	left: ${NAVBAR_WIDTH - 8}px;
	bottom: 34px;

	&::after {
		content: '◀';
		position: absolute;
		left: -13px;
		bottom: 6px;
		z-index: 1;
		color: var(--navbarDropdownBorderColor);
	}
`;

const profileDropdownButtonStyle = css`
	color: var(--baseTextColor);
	${buttonMixin};
	padding: 10px 16px;
	width: 120px;

	&:hover {
		background-color: var(--primary);
		color: var(--white);
	}
`;

export const ProfileDropdownButton = styled.button`
	${profileDropdownButtonStyle};
`;

export const ProfilePageLink = styled(Link)`
	${profileDropdownButtonStyle};
	text-align: center;
	text-decoration: none;
`;

export const ProfileImageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--cardBgColor);
	width: 50px;
	height: 50px;
	box-shadow: 0 0 0 1px var(--baseBorderColor);
	border-radius: 50%;

	& > svg {
		fill: var(--gray);
	}
`;

export const NavSearchStockContainer = styled.div`
	display: none;
	z-index: 2;
	height: 100%;
	padding: 0 14px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		display: flex;
		align-items: center;
	}
`;
