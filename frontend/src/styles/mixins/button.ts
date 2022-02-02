import { css, FlattenInterpolation, ThemeProps, DefaultTheme } from 'styled-components';
import { getColor } from '@utils';
import { flexMixin, FlexProps } from './flexMixin';

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

const buttonMixin = css<ButtonStyleProps>`
	display: block;
	${({ flex }) => flex && flexMixin};
	width: ${({ width }) => width ?? '100%'};
	height: ${({ height }) => height ?? '100%'};
	outline: none;
	border: ${({ border }) => border ?? 'none'};
	background-color: ${({ backgroundColor, theme }) =>
		getColor(theme, backgroundColor ?? '') ?? backgroundColor};
	border-radius: ${({ borderRadius }) => borderRadius ?? '0'};
	box-shadow: ${({ boxShadow }) => boxShadow ?? 'none'};
	color: ${({ color, theme }) => color ?? theme.base.textColor};
	cursor: ${({ cursor }) => cursor ?? 'pointer'};
`;

export default buttonMixin;
