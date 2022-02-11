import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { flexMixin, flexCenter, navbarIconMixin, buttonMixin } from '@styles/Mixins';
import { navbarWidth, globalColors } from '@constants/index';

export const Container = styled.aside`
	display: flex;
	flex-direction: column;
	position: sticky;
	top: 0;
	background-color: ${({ theme }) => theme.navbar.bgColor};
	width: ${navbarWidth}px;
	height: 100vh;
	z-index: 1;
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

export const NavbarLink = styled(NavLink)`
	${flexMixin}
	flex-direction: column;
	align-items: center;
	transform: scale(0.9);
	text-decoration: none;
	${navbarIconMixin};
`;

export const Button = styled.button`
	${buttonMixin};
	${navbarIconMixin};
	${flexCenter};
	flex-direction: column;
`;

export const DropdownContainer = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${({ theme }) => theme.navbar.dropdownBgColor};
	border: 1px solid ${({ theme }) => theme.navbar.dropdownBorderColor};
	border-radius: 4px;
	left: ${navbarWidth - 8}px;
	bottom: 34px;

	&::after {
		content: '◀';
		position: absolute;
		left: -13px;
		bottom: 6px;
		z-index: 1;
		color: ${({ theme }) => theme.navbar.dropdownBgColor};
	}
`;

export const DropdownButton = styled.button`
	color: ${({ theme }) => theme.navbar.textColor};
	${buttonMixin};
	padding: 10px 16px;
	width: 120px;

	&:hover {
		background-color: ${globalColors.primary};
	}
`;
