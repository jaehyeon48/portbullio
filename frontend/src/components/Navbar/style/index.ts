import styled from 'styled-components';
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
	${flexMixin}
	height: 10%;
	margin: 0.5em 0 0;
`;

export const Middle = styled.div`
	${flexMixin}
	height: 80%;
	margin: 6em 0;
`;

export const Bottom = styled.div`
	${flexMixin}
	height: 10%;
`;
