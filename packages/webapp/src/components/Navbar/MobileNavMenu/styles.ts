import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MOBILE_NAVBAR_HEIGHT_PX, WIDTH_BREAK_POINT_PX } from '@constants/index';
import { buttonMixin } from '@styles/Mixins';

export const MobileNavMenuContainer = styled.div`
	position: absolute;
	top: ${MOBILE_NAVBAR_HEIGHT_PX}px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	height: calc(100vh - ${MOBILE_NAVBAR_HEIGHT_PX}px);
	background-color: var(--cardBgColor);
	z-index: 2;

	@media screen and (min-width: ${WIDTH_BREAK_POINT_PX.laptopSmall + 1}px) {
		display: none;
	}
`;

export const MobileNavMenuList = styled.ul`
	list-style-type: none;
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0;
	margin: 0;
`;

export const MobileNavMenuListItem = styled.li`
	border-bottom: 1px solid var(--navbarDropdownBorderColor);
`;

export const MobileNavMenuLink = styled(Link)`
	display: block;
	width: 100%;
	text-decoration: none;
	color: var(--baseTextColor);
	padding: 12px 16px;
`;

export const MobileNavMenuLogOutButton = styled.button`
	${buttonMixin};
	background-color: var(--primary);
	color: var(--white);
	border-radius: 4px;
	margin: 30px auto;
	padding: 8px 12px;
	width: 80%;
`;

export const MobileNavMenuUsernameContainer = styled.div`
	padding: 8px;
`;

export const MobileNavMenuUsername = styled.span`
	font-weight: 700;
	color: var(--primary);
`;
