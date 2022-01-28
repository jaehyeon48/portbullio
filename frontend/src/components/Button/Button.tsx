import styled, { FlattenInterpolation, ThemeProps, DefaultTheme } from 'styled-components';
import { flexMixin, FlexProps } from '@styles/mixins';

interface ButtonStyleProps extends FlexProps {
	flex?: boolean;
	border?: string;
	borderRadius?: string;
	backgroundColor?: string;
	color?: string;
	cursor?: string;
	boxShadow?: string;
	width?: string;
	height?: string;
	css?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

const Button = styled.button<ButtonStyleProps>`
	display: block;
	${({ flex }) => flex && flexMixin};
	width: ${({ width }) => width ?? '100%'};
	height: ${({ height }) => height ?? '100%'};
	outline: none;
	border: ${({ border }) => border ?? 'none'};
	border-radius: ${({ borderRadius }) => borderRadius ?? '0'};
	background-color: ${({ backgroundColor }) => backgroundColor ?? 'transparent'};
	box-shadow: ${({ boxShadow }) => boxShadow ?? 'none'};
	color: ${({ color, theme }) => color ?? theme.base.textColor};
	cursor: ${({ cursor }) => cursor ?? 'pointer'};
`;

export default Button;
