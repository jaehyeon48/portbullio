import styled from 'styled-components';
import { buttonMixin } from '@styles/mixins';
import { getColor } from '@utils';

interface ButtonProps {
	backgroundColor: string;
}

export const PageContainer = styled.div`
	width: 300px;
	height: 90px;
`;

export const Header = styled.header`
	color: ${({ theme }) => theme.base.textColor};
	text-align: center;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin-top: 1em;
`;

export const Button = styled.button<ButtonProps>`
	${buttonMixin};
	border-radius: 4px;
	padding: 0.2em 0.6em;
	color: #fff;
	background-color: ${({ backgroundColor, theme }) => getColor(theme, backgroundColor)};
`;
