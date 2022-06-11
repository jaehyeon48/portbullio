import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { NAVBAR_WIDTH } from '@constants/index';
import { buttonMixin } from '@styles/Mixins';

export const NavProfileDropdownContainer = styled.div`
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

const navProfileDropdownButtonStyle = css`
	color: var(--baseTextColor);
	${buttonMixin};
	padding: 10px 16px;
	width: 120px;

	&:hover {
		background-color: var(--primary);
		color: var(--white);
	}
`;

export const NavProfileDropdownButton = styled.button`
	${navProfileDropdownButtonStyle};
`;

export const NavProfilePageLink = styled(Link)`
	${navProfileDropdownButtonStyle};
	text-align: center;
	text-decoration: none;
`;
