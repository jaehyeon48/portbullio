import { SVGProps } from 'react';
import styled from 'styled-components';
import { Colors } from '@types';

interface Props {
	width: number;
	height: number;
	fill: string;
	viewBox: string;
	children: SVGProps<SVGPathElement> | SVGProps<SVGPathElement>[];
}

interface SvgProps {
	width: string | number;
	height: string | number;
	fill: string;
}

const Svg = styled.svg<SvgProps>`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	fill: ${({ fill, theme }) => theme.colors[fill as keyof Colors] ?? fill};
`;

export default function SVG({ width, height, fill, viewBox, children }: Props) {
	return (
		<Svg
			width={width}
			height={height}
			fill={fill}
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg"
		>
			{children}
		</Svg>
	);
}
