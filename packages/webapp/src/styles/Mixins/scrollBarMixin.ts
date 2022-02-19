import { css } from 'styled-components';
import { ScrollBarThumbProps } from '@types';

const scrollBarMixin = css<ScrollBarThumbProps>`
	position: absolute;
	height: ${({ height }) => height}px;
	cursor: pointer;
	border-radius: 8px;
	width: 8px;
	top: 0px;
	right: 1px;
`;

export default scrollBarMixin;
