import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { flexMixin, flexCenter, navbarIconMixin, buttonMixin } from '@src/styles/mixins';
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

export const NavbarLink = styled(NavLink)`
	${flexMixin}
	flex-direction: column;
	align-items: center;
	transform: scale(0.9);
	text-decoration: none;
	${navbarIconMixin};
`;

export const Button = styled.button`
	${flexCenter};
	flex-direction: column;
	${buttonMixin};
	${navbarIconMixin};
`;
