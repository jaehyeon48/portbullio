import { SVGProps } from 'react';
import styled from 'styled-components';
import { getColor } from '@utils';

interface Props {
	width: number;
	height: number;
	fill: string;
	viewBox: string;
	children: SVGProps<SVGPathElement> | SVGProps<SVGPathElement>[];
	ariaLabel?: string;
}

interface SvgStyleProps {
	width: string | number;
	height: string | number;
	fill: string;
}

const Svg = styled.svg<SvgStyleProps>`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	fill: ${({ fill, theme }) => getColor(theme, fill) ?? fill};
`;

export default function SVG({ width, height, fill, viewBox, children, ariaLabel }: Props) {
	return (
		<Svg
			width={width}
			height={height}
			fill={fill}
			viewBox={viewBox}
			aria-label={ariaLabel}
			xmlns="http://www.w3.org/2000/svg"
		>
			{children}
		</Svg>
	);
}
